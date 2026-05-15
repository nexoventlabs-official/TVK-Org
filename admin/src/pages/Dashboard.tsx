import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, CalendarClock, AlertCircle, CheckCircle2, PieChart, BarChart3, Activity, Grid3x3, Send, Building2, Users, GraduationCap } from 'lucide-react';
import api from '../lib/api';
import { DonutChart, DonutLegend, HBarChart, LineChart, Heatmap } from '../components/Charts';

/**
 * Admin dashboard. Pulls a single rollup payload from
 * /api/admin/dashboard and renders it as stat cards, status donut,
 * by-category bars, daily timeline, and a weekday × hour heatmap.
 *
 * Polls every 15s — same cadence as the TVK admin web — so the page
 * feels live without being aggressive.
 */

const CATEGORY_META: Record<string, { label: string; color: string; icon: any; to: string }> = {
  party: { label: 'Party · Kalagam Pani', color: '#FFCC00', icon: Users, to: '/enquiries/party' },
  assembly: { label: 'Assembly · Mylapore', color: '#93C5FD', icon: Building2, to: '/enquiries/assembly' },
  education: { label: 'Education · Tamil Nadu', color: '#86EFAC', icon: GraduationCap, to: '/enquiries/education' },
};

const STATUS_META: Record<string, { label: string; color: string }> = {
  new:         { label: 'New',         color: '#FFCC00' },
  in_progress: { label: 'In Progress', color: '#93C5FD' },
  resolved:    { label: 'Resolved',    color: '#86EFAC' },
  rejected:    { label: 'Rejected',    color: '#F87171' },
};

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const load = async (silent = false) => {
      try {
        const r = await api.get('/admin/dashboard');
        if (alive) setData(r.data);
      } catch {
        // swallow — keep last good payload visible
      } finally {
        if (alive && !silent) setLoading(false);
      }
    };
    load();
    const t = setInterval(() => load(true), 15000);
    return () => { alive = false; clearInterval(t); };
  }, []);

  if (loading || !data) {
    return <div className="text-cream/40 text-xs uppercase tracking-[0.2em] py-12 text-center">Loading…</div>;
  }

  const statusData = Object.entries(STATUS_META).map(([k, m]) => ({
    key: k,
    label: m.label,
    color: m.color,
    value: data.statusBreakdown?.[k] || 0,
  }));

  const categoryData = data.byCategory.map((c: any) => ({
    label: CATEGORY_META[c.category]?.label || c.category,
    value: c.count,
    color: CATEGORY_META[c.category]?.color || '#FFCC00',
  }));

  return (
    <div className="space-y-6">
      {/* ── Stat row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Inbox}        label="Total Enquiries" value={data.stats.total} />
        <StatCard icon={CalendarClock} label="Today"           value={data.stats.today} accent="#93C5FD" />
        <StatCard icon={AlertCircle}  label="New"              value={data.stats.new}   accent="#FFCC00" />
        <StatCard icon={CheckCircle2} label="Resolved"         value={data.stats.resolved} accent="#86EFAC" />
      </div>

      {/* ── Category quick links ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.byCategory.map((c: any) => {
          const meta = CATEGORY_META[c.category];
          if (!meta) return null;
          const Icon = meta.icon;
          return (
            <Link
              key={c.category}
              to={meta.to}
              className="card p-5 hover:bg-ink-100 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-sm grid place-items-center" style={{ background: `${meta.color}15`, color: meta.color }}>
                  <Icon size={16} />
                </div>
                <span className="text-[9px] uppercase tracking-[0.16em] text-cream/35 group-hover:text-cream/60">
                  Open →
                </span>
              </div>
              <div className="font-display font-bold text-cream text-2xl tabular-nums">{c.count}</div>
              <div className="text-[11px] text-cream/55 mt-0.5">{meta.label}</div>
            </Link>
          );
        })}
      </div>

      {/* ── Donut + Category bars ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card icon={PieChart} title="Status Breakdown" eyebrow="Pipeline health">
          {data.stats.total === 0 ? (
            <Empty />
          ) : (
            <div className="flex items-center gap-8 mt-2">
              <DonutChart
                data={statusData}
                size={170}
                thickness={24}
                centerLabel="Total"
                centerValue={data.stats.total}
              />
              <div className="flex-1 min-w-0">
                <DonutLegend data={statusData} />
              </div>
            </div>
          )}
        </Card>

        <Card icon={BarChart3} title="By Category" eyebrow="Last 30 days totals">
          <HBarChart data={categoryData} />
        </Card>
      </div>

      {/* ── Timeline ── */}
      <Card icon={Activity} title="Daily Enquiry Volume" eyebrow={`Last ${data.meta.timelineDays} days`}>
        <LineChart data={data.timeline} width={720} height={170} color="#FFCC00" />
      </Card>

      {/* ── Heatmap ── */}
      <Card icon={Grid3x3} title="When Enquiries Arrive" eyebrow={`Weekday × hour · last ${data.meta.heatmapDays} days · IST`}>
        <Heatmap cells={data.heatmap} color="#FFCC00" />
      </Card>

      {/* ── Recent ── */}
      <Card icon={Send} title="Recent Enquiries" eyebrow="Last 8 submissions">
        {data.recent.length === 0 ? <Empty /> : (
          <ul className="divide-y divide-cream/[0.05]">
            {data.recent.map((r: any) => {
              const meta = CATEGORY_META[r.category];
              return (
                <li key={r._id} className="py-3 flex items-center gap-3">
                  <span className="w-1.5 h-8 rounded-sm" style={{ background: meta?.color || '#666' }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] text-cream truncate">{r.name} · <span className="text-cream/50">{r.mobile}</span></div>
                    <div className="text-[11px] text-cream/45 truncate">{r.request}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: meta?.color || '#fff' }}>
                      {meta?.label?.split('·')[0]?.trim() || r.category}
                    </div>
                    <div className="text-[10px] text-cream/40 mt-0.5">{timeAgo(r.createdAt)}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}

/* ─── Helpers ─── */

function Card({ icon: Icon, title, eyebrow, children }: { icon: any; title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="card p-5">
      <div className="flex items-start gap-2 mb-4">
        <Icon size={14} className="text-brand-gold mt-0.5" />
        <div>
          <div className="font-display font-bold text-cream text-[14px] leading-tight">{title}</div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-cream/40 mt-0.5">{eyebrow}</div>
        </div>
      </div>
      {children}
    </section>
  );
}

function StatCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: number; accent?: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-9 h-9 rounded-sm grid place-items-center"
          style={{
            background: accent ? `${accent}15` : 'rgba(255,204,0,0.08)',
            color: accent || '#FFCC00',
          }}
        >
          <Icon size={16} />
        </div>
        <div className="text-[10px] uppercase tracking-[0.14em] text-cream/45">{label}</div>
      </div>
      <div className="font-display font-bold text-cream text-2xl tabular-nums">{Number(value || 0).toLocaleString('en-IN')}</div>
    </div>
  );
}

function Empty() {
  return <div className="text-cream/40 text-xs py-6 text-center">No data yet.</div>;
}

function timeAgo(iso: string) {
  const d = new Date(iso);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}
