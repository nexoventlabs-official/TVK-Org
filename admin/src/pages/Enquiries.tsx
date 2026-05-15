import { useEffect, useMemo, useState, useCallback } from 'react';
import { Search, X, Phone, Mail, MessageSquare, Clock, Send, RefreshCw, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../lib/api';

/**
 * Single component that handles all three category-specific list
 * pages by parameterising on `category`. Renders a search bar +
 * status filter, a card list of enquiries, and a slide-in detail
 * drawer with status update / notes / WhatsApp resend / delete.
 */

interface Enquiry {
  _id: string;
  category: 'party' | 'assembly' | 'education';
  name: string;
  mobile: string;
  email?: string;
  request: string;
  status: 'new' | 'in_progress' | 'resolved' | 'rejected';
  notes?: string;
  waLog?: any[];
  waLastStatus?: '' | 'sent' | 'failed' | 'skipped';
  createdAt: string;
}

const CATEGORY_LABEL: Record<string, string> = {
  party: 'TVK · Kalagam Pani',
  assembly: 'Mylapore Assembly',
  education: 'Tamil Nadu Education',
};

const CATEGORY_ACCENT: Record<string, string> = {
  party: '#FFCC00',
  assembly: '#93C5FD',
  education: '#86EFAC',
};

const STATUSES = [
  { v: '', label: 'All' },
  { v: 'new', label: 'New' },
  { v: 'in_progress', label: 'In Progress' },
  { v: 'resolved', label: 'Resolved' },
  { v: 'rejected', label: 'Rejected' },
];

const STATUS_COLOR: Record<string, string> = {
  new: '#FFCC00',
  in_progress: '#93C5FD',
  resolved: '#86EFAC',
  rejected: '#F87171',
};

export default function Enquiries({ category }: { category: 'party' | 'assembly' | 'education' }) {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const r = await api.get('/admin/enquiries', { params: { category, status, q, limit: 100 } });
      setItems(r.data.items);
      setTotal(r.data.total);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [category, status, q]);

  // Reset selection on category swap (route change).
  useEffect(() => { setSelected(null); }, [category]);

  // Initial + filter-driven load. Also poll silently every 20s for new
  // submissions while the page is open.
  useEffect(() => {
    load();
    const t = setInterval(() => load(true), 20000);
    return () => clearInterval(t);
  }, [load]);

  const accent = CATEGORY_ACCENT[category];

  return (
    <div className="space-y-5">
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[260px] max-w-md">
          <Search size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-cream/30" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input pl-9"
            placeholder="Search name, phone, email, request…"
          />
        </div>
        <div className="flex items-center gap-1 ml-auto">
          {STATUSES.map((s) => (
            <button
              key={s.v}
              onClick={() => setStatus(s.v)}
              className={[
                'h-8 px-3 text-[10px] uppercase tracking-[0.12em] rounded-sm border transition-colors',
                status === s.v
                  ? 'bg-cream/10 border-cream/25 text-cream'
                  : 'bg-transparent border-cream/10 text-cream/55 hover:text-cream',
              ].join(' ')}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button onClick={() => load()} className="btn-ghost flex items-center gap-1.5">
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      <div className="text-[11px] text-cream/45">
        <span className="text-cream font-semibold">{total}</span> enquiries · {CATEGORY_LABEL[category]}
      </div>

      {/* ── List ── */}
      {loading ? (
        <div className="text-cream/40 text-xs uppercase tracking-[0.2em] py-12 text-center">Loading…</div>
      ) : items.length === 0 ? (
        <div className="card p-10 text-center">
          <div className="text-cream/35 text-[13px]">No {category} enquiries match your filters.</div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((e) => (
            <li
              key={e._id}
              onClick={() => setSelected(e)}
              className="card p-4 cursor-pointer hover:bg-ink-100 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <div className="font-display font-bold text-cream text-[15px] leading-tight truncate">
                    {e.name}
                  </div>
                  <div className="text-[11px] text-cream/55 mt-0.5 flex items-center gap-1">
                    <Phone size={10} /> {e.mobile}
                  </div>
                </div>
                <span
                  className="text-[9px] uppercase tracking-[0.14em] px-2 py-1 rounded-sm border"
                  style={{ color: STATUS_COLOR[e.status], borderColor: `${STATUS_COLOR[e.status]}55` }}
                >
                  {e.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-[12px] text-cream/70 line-clamp-3 leading-snug">{e.request}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream/[0.05]">
                <span className="text-[10px] text-cream/40 flex items-center gap-1">
                  <Clock size={10} /> {timeAgo(e.createdAt)}
                </span>
                <WaPill status={e.waLastStatus} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ── Drawer ── */}
      {selected && (
        <Drawer
          enquiry={selected}
          accent={accent}
          onClose={() => setSelected(null)}
          onSaved={(u) => {
            setItems((prev) => prev.map((p) => (p._id === u._id ? { ...p, ...u } : p)));
            setSelected(u);
          }}
          onDeleted={() => {
            setItems((prev) => prev.filter((p) => p._id !== selected._id));
            setSelected(null);
            setTotal((t) => Math.max(0, t - 1));
          }}
        />
      )}
    </div>
  );
}

/* ────────────────────── Drawer ────────────────────── */

function Drawer({ enquiry, accent, onClose, onSaved, onDeleted }: { enquiry: Enquiry; accent: string; onClose: () => void; onSaved: (u: Enquiry) => void; onDeleted: () => void }) {
  const [status, setStatus] = useState(enquiry.status);
  const [notes, setNotes] = useState(enquiry.notes || '');
  const [busy, setBusy] = useState(false);
  const [resending, setResending] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  // If a different enquiry is opened, sync local state.
  useEffect(() => {
    setStatus(enquiry.status);
    setNotes(enquiry.notes || '');
    setMsg(null);
  }, [enquiry._id]);

  const dirty = status !== enquiry.status || (notes || '') !== (enquiry.notes || '');

  const save = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const r = await api.patch(`/admin/enquiries/${enquiry._id}`, { status, notes });
      onSaved(r.data);
      setMsg({ kind: 'ok', text: 'Saved.' });
    } catch (e: any) {
      setMsg({ kind: 'err', text: e?.message || 'Save failed' });
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    setResending(true);
    setMsg(null);
    try {
      const r = await api.post(`/admin/enquiries/${enquiry._id}/resend`);
      const reloaded = await api.get(`/admin/enquiries/${enquiry._id}`);
      onSaved(reloaded.data);
      setMsg({
        kind: r.data.ok ? 'ok' : 'err',
        text: r.data.ok ? 'WhatsApp sent.' : `Skipped: ${r.data.log?.error || r.data.status}`,
      });
    } catch (e: any) {
      setMsg({ kind: 'err', text: e?.message || 'Resend failed' });
    } finally {
      setResending(false);
    }
  };

  const remove = async () => {
    if (!confirm('Delete this enquiry permanently?')) return;
    setBusy(true);
    try {
      await api.delete(`/admin/enquiries/${enquiry._id}`);
      onDeleted();
    } catch (e: any) {
      setMsg({ kind: 'err', text: e?.message || 'Delete failed' });
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1 bg-black/60" onClick={onClose} />
      <div className="w-full max-w-md bg-ink-50 border-l border-cream/[0.08] overflow-y-auto">
        <div className="h-[3px]" style={{ background: accent }} />
        <div className="px-6 py-5 border-b border-cream/[0.06] flex items-center justify-between sticky top-0 bg-ink-50 z-10">
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-cream/40">Enquiry</div>
            <h2 className="font-display font-bold text-cream text-lg">{enquiry.name}</h2>
          </div>
          <button onClick={onClose} className="text-cream/50 hover:text-cream">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Contact */}
          <div className="space-y-2">
            <FieldRow icon={Phone} label="Mobile" value={enquiry.mobile} href={`tel:${enquiry.mobile}`} />
            {enquiry.email ? <FieldRow icon={Mail} label="Email" value={enquiry.email} href={`mailto:${enquiry.email}`} /> : null}
            <FieldRow icon={Clock} label="Submitted" value={new Date(enquiry.createdAt).toLocaleString('en-IN')} />
          </div>

          {/* Request */}
          <div>
            <div className="label flex items-center gap-1.5"><MessageSquare size={11} /> Request</div>
            <div className="card p-3 text-[12px] text-cream/85 whitespace-pre-wrap leading-relaxed">{enquiry.request}</div>
          </div>

          {/* Status */}
          <div>
            <div className="label">Status</div>
            <div className="grid grid-cols-2 gap-2">
              {(['new', 'in_progress', 'resolved', 'rejected'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={[
                    'h-9 text-[10px] uppercase tracking-[0.14em] rounded-sm border transition-colors',
                    status === s
                      ? 'border-transparent text-ink-0'
                      : 'bg-transparent border-cream/10 text-cream/55 hover:text-cream',
                  ].join(' ')}
                  style={status === s ? { background: STATUS_COLOR[s] } : {}}
                >
                  {s.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="label">Internal notes</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note for the back-office…"
              className="input pt-2.5"
              style={{ height: 90, resize: 'none' }}
            />
          </div>

          {/* WhatsApp */}
          <div>
            <div className="label flex items-center gap-1.5"><Send size={11} /> WhatsApp confirmation</div>
            <WaSummary enquiry={enquiry} />
            <button
              onClick={resend}
              disabled={resending}
              className="btn-ghost w-full mt-2 flex items-center justify-center gap-1.5"
            >
              <Send size={11} /> {resending ? 'Sending…' : 'Send / Resend now'}
            </button>
          </div>

          {/* Save / delete */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={save} disabled={busy || !dirty} className="btn-primary disabled:opacity-50">
              {busy ? 'Saving…' : 'Save changes'}
            </button>
            <button onClick={remove} disabled={busy} className="btn-ghost flex items-center justify-center gap-1.5 text-red-300/80 hover:text-red-300 hover:bg-red-500/[0.08]">
              <Trash2 size={11} /> Delete
            </button>
          </div>

          {msg && (
            <div
              className={[
                'flex items-start gap-1.5 text-[11px] rounded-sm px-3 py-2 border',
                msg.kind === 'ok'
                  ? 'text-green-300 bg-green-500/10 border-green-500/30'
                  : 'text-red-300 bg-red-500/10 border-red-500/30',
              ].join(' ')}
            >
              {msg.kind === 'ok' ? <CheckCircle2 size={12} className="mt-0.5" /> : <AlertCircle size={12} className="mt-0.5" />}
              <span>{msg.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FieldRow({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-2.5 py-1.5">
      <Icon size={12} className="text-cream/35" />
      <div className="flex-1 min-w-0">
        <div className="text-[9px] uppercase tracking-[0.14em] text-cream/35">{label}</div>
        <div className="text-[12px] text-cream truncate">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:bg-cream/[0.04] rounded-sm px-2 -mx-2">{inner}</a> : inner;
}

function WaSummary({ enquiry }: { enquiry: Enquiry }) {
  const last = enquiry.waLog?.[enquiry.waLog.length - 1];
  if (!enquiry.waLastStatus || !last) {
    return <div className="card p-3 text-[11px] text-cream/45">No WhatsApp attempt yet.</div>;
  }
  const status = enquiry.waLastStatus;
  const colorMap: Record<string, string> = {
    sent: '#86EFAC',
    failed: '#F87171',
    skipped: '#FFCC00',
  };
  const color = colorMap[status] || '#FFCC00';
  return (
    <div className="card p-3 space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-[0.14em]" style={{ color }}>{status}</span>
        <span className="text-[10px] text-cream/40">{new Date(last.sentAt).toLocaleString('en-IN')}</span>
      </div>
      {last.error ? (
        <div className="text-[11px] text-red-300/80 leading-relaxed">{last.error}</div>
      ) : (
        <div className="text-[11px] text-cream/65 whitespace-pre-wrap leading-relaxed">{last.body}</div>
      )}
    </div>
  );
}

function WaPill({ status }: { status?: '' | 'sent' | 'failed' | 'skipped' }) {
  if (!status) return <span className="text-[9px] text-cream/30 uppercase tracking-[0.14em]">no WA</span>;
  const meta: Record<string, { label: string; color: string }> = {
    sent: { label: 'WA Sent', color: '#86EFAC' },
    failed: { label: 'WA Failed', color: '#F87171' },
    skipped: { label: 'WA Skipped', color: '#FFCC00' },
  };
  const m = meta[status];
  return (
    <span
      className="text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-sm border"
      style={{ color: m.color, borderColor: `${m.color}55` }}
    >
      {m.label}
    </span>
  );
}

function timeAgo(iso: string) {
  const d = new Date(iso);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}
