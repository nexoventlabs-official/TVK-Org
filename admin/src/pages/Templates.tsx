import { useEffect, useState } from 'react';
import { Save, ExternalLink, MessageSquareText, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../lib/api';

/**
 * Template editor — one card per category. Body, CTA URL/label, and
 * an optional Meta-template name (set this once a template is approved
 * on Meta and the dispatcher will start sending native templates with
 * the CTA URL button instead of free-form text).
 */

interface Template {
  _id?: string;
  category: 'party' | 'assembly' | 'education';
  label: string;
  bodyText: string;
  ctaLabel: string;
  ctaUrl: string;
  language: string;
  metaTemplateName: string;
}

const CATEGORIES: { v: 'party' | 'assembly' | 'education'; label: string; eyebrow: string; accent: string }[] = [
  { v: 'party', label: 'Party Enquiry', eyebrow: 'TVK · Kalagam Pani', accent: '#FFCC00' },
  { v: 'assembly', label: 'Assembly Enquiry', eyebrow: 'Mylapore Assembly', accent: '#93C5FD' },
  { v: 'education', label: 'Education Enquiry', eyebrow: 'Tamil Nadu', accent: '#86EFAC' },
];

export default function Templates() {
  const [items, setItems] = useState<Record<string, Template>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/templates')
      .then((r: any) => {
        const map: Record<string, Template> = {};
        for (const t of r.data.items) map[t.category] = t;
        setItems(map);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-cream/40 text-xs uppercase tracking-[0.2em] py-12 text-center">Loading…</div>;

  return (
    <div className="space-y-5">
      <div className="card p-4 flex items-start gap-3">
        <Info size={14} className="text-brand-gold mt-0.5 shrink-0" />
        <div className="text-[12px] text-cream/70 leading-relaxed">
          <strong className="text-cream">How sending works:</strong> within a 24h conversation
          window we send free-form text. Outside the window the dispatcher needs a Meta-approved
          template — once you have one, paste its <code className="text-cream/85">name</code> in
          the field below and the system will switch over automatically. Use{' '}
          <code className="text-cream/85">{'{{name}}'}</code> in the body to inject the
          enquirer's name.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((c) => (
          <TemplateCard
            key={c.v}
            meta={c}
            initial={items[c.v]}
            onSaved={(t) => setItems((m) => ({ ...m, [c.v]: t }))}
          />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({
  meta,
  initial,
  onSaved,
}: {
  meta: { v: 'party' | 'assembly' | 'education'; label: string; eyebrow: string; accent: string };
  initial?: Template;
  onSaved: (t: Template) => void;
}) {
  const blank: Template = {
    category: meta.v,
    label: meta.label,
    bodyText: '',
    ctaLabel: '',
    ctaUrl: '',
    language: 'en_US',
    metaTemplateName: '',
  };
  const [t, setT] = useState<Template>(initial || blank);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const save = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const r = await api.put(`/admin/templates/${meta.v}`, t);
      onSaved(r.data);
      setT(r.data);
      setMsg({ kind: 'ok', text: 'Saved.' });
    } catch (e: any) {
      setMsg({ kind: 'err', text: e?.message || 'Save failed' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="card overflow-hidden">
      <div className="h-[3px]" style={{ background: meta.accent }} />
      <div className="p-5 space-y-4">
        <div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.2em]" style={{ color: meta.accent }}>
            {meta.eyebrow}
          </div>
          <h3 className="font-display font-bold text-cream text-base">{meta.label}</h3>
        </div>

        <div>
          <div className="label">Display label</div>
          <input
            value={t.label}
            onChange={(e) => setT({ ...t, label: e.target.value })}
            className="input"
            placeholder="Party Enquiry Confirmation"
          />
        </div>

        <div>
          <div className="label flex items-center gap-1.5"><MessageSquareText size={11} /> Body — supports {'{{name}}'}</div>
          <textarea
            value={t.bodyText}
            onChange={(e) => setT({ ...t, bodyText: e.target.value })}
            className="input pt-2.5"
            placeholder="Vanakkam {{name}}…"
            style={{ height: 160, resize: 'vertical' }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="label">CTA Label</div>
            <input
              value={t.ctaLabel}
              onChange={(e) => setT({ ...t, ctaLabel: e.target.value })}
              className="input"
              placeholder="Visit page"
            />
          </div>
          <div>
            <div className="label">Language</div>
            <input
              value={t.language}
              onChange={(e) => setT({ ...t, language: e.target.value })}
              className="input"
              placeholder="en_US"
            />
          </div>
        </div>

        <div>
          <div className="label flex items-center gap-1.5"><ExternalLink size={11} /> CTA URL</div>
          <input
            value={t.ctaUrl}
            onChange={(e) => setT({ ...t, ctaUrl: e.target.value })}
            className="input"
            placeholder="https://venkatraman.in/…"
          />
        </div>

        <div>
          <div className="label">Meta template name <span className="text-cream/30">(once approved)</span></div>
          <input
            value={t.metaTemplateName}
            onChange={(e) => setT({ ...t, metaTemplateName: e.target.value })}
            className="input"
            placeholder="enquiry_confirmation_party"
          />
          <div className="text-[10px] text-cream/35 mt-1.5 leading-relaxed">
            Leave blank until you create the matching template on Meta. Once filled in, the
            dispatcher will send via template (works outside the 24h window).
          </div>
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

        <button onClick={save} disabled={busy} className="btn-primary w-full flex items-center justify-center gap-1.5">
          <Save size={12} /> {busy ? 'Saving…' : 'Save template'}
        </button>
      </div>
    </section>
  );
}
