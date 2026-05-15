import React, { useMemo } from 'react';

/**
 * Pure-SVG chart kit — donut, horizontal bars, line/area, and an
 * activity heatmap. No external chart deps; all sizing is driven by
 * a `width` prop so callers can fit them into responsive grids.
 */

/* ── DonutChart ───────────────────────────────────────────────── */

interface DonutDatum {
  key: string;
  label: string;
  value: number;
  color: string;
}

interface DonutProps {
  data: DonutDatum[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: number | string;
}

export function DonutChart({ data, size = 180, thickness = 26, centerLabel, centerValue }: DonutProps) {
  const total = data.reduce((s, d) => s + (d.value || 0), 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;

  let acc = 0;
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle cx={cx} cy={cy} r={r} stroke="rgba(245,240,232,0.06)" strokeWidth={thickness} fill="none" />
          {data.map((d) => {
            const v = d.value || 0;
            if (v <= 0) return null;
            const len = (v / total) * C;
            const dash = `${len} ${C - len}`;
            const offset = -((acc / total) * C);
            acc += v;
            return (
              <circle
                key={d.key}
                cx={cx}
                cy={cy}
                r={r}
                stroke={d.color}
                strokeWidth={thickness}
                fill="none"
                strokeDasharray={dash}
                strokeDashoffset={offset}
                strokeLinecap="butt"
              />
            );
          })}
        </g>
      </svg>
      <div className="absolute inset-0 grid place-items-center pointer-events-none text-center">
        <div>
          <div className="font-display font-bold text-cream text-2xl leading-none">
            {centerValue ?? total}
          </div>
          {centerLabel && (
            <div className="text-[9px] uppercase tracking-[0.18em] text-cream/40 mt-1">
              {centerLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DonutLegend({ data }: { data: DonutDatum[] }) {
  const total = data.reduce((s, d) => s + (d.value || 0), 0) || 1;
  return (
    <ul className="space-y-2">
      {data.map((d) => {
        const pct = ((d.value || 0) / total) * 100;
        return (
          <li key={d.key} className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />
            <span className="text-[12px] text-cream/80 flex-1 truncate">{d.label}</span>
            <span className="text-[12px] text-cream font-semibold tabular-nums">{d.value || 0}</span>
            <span className="text-[10px] text-cream/40 tabular-nums w-8 text-right">{pct.toFixed(0)}%</span>
          </li>
        );
      })}
    </ul>
  );
}

/* ── HBarChart ───────────────────────────────────────────────── */

interface HBarDatum {
  label: string;
  value: number;
  color?: string;
}

export function HBarChart({ data, accent = '#FFCC00' }: { data: HBarDatum[]; accent?: string }) {
  if (!data.length) return <div className="text-cream/40 text-xs py-6 text-center">No data.</div>;
  const max = Math.max(...data.map((d) => d.value || 0), 1);
  return (
    <ul className="space-y-3">
      {data.map((d, i) => {
        const pct = ((d.value || 0) / max) * 100;
        return (
          <li key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] text-cream/80 truncate">{d.label}</span>
              <span className="text-[11px] text-cream font-semibold tabular-nums">{d.value || 0}</span>
            </div>
            <div className="h-2 rounded-sm bg-cream/[0.06] overflow-hidden">
              <div
                className="h-full rounded-sm transition-[width] duration-500"
                style={{ width: `${pct}%`, background: d.color || accent }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ── LineChart ───────────────────────────────────────────────── */

interface LinePoint {
  date: string;     // YYYY-MM-DD
  count: number;
}

export function LineChart({ data, width = 720, height = 160, color = '#FFCC00' }: { data: LinePoint[]; width?: number; height?: number; color?: string }) {
  if (!data.length) return <div className="text-cream/40 text-xs py-6 text-center">No data.</div>;
  const padX = 8;
  const padY = 14;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const max = Math.max(...data.map((d) => d.count || 0), 1);
  const stepX = innerW / Math.max(data.length - 1, 1);

  const pts = data.map((d, i) => {
    const x = padX + i * stepX;
    const y = padY + innerH - ((d.count || 0) / max) * innerH;
    return { x, y, ...d };
  });
  const linePath = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPath =
    `M ${pts[0].x},${padY + innerH} ` +
    pts.map((p) => `L ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') +
    ` L ${pts[pts.length - 1].x},${padY + innerH} Z`;

  // Pick first/mid/last for x-axis labels
  const labelIdx = [0, Math.floor(data.length / 2), data.length - 1];
  const gradId = `lineGrad_${color.replace('#', '')}`;

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.32" />
            <stop offset="1" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Baseline */}
        <line x1={padX} y1={padY + innerH} x2={width - padX} y2={padY + innerH} stroke="rgba(245,240,232,0.08)" />
        <path d={areaPath} fill={`url(#${gradId})`} />
        <polyline points={linePath} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) =>
          labelIdx.includes(i) ? (
            <circle key={i} cx={p.x} cy={p.y} r={3} fill="#0D0D0D" stroke={color} strokeWidth="1.4" />
          ) : null
        )}
      </svg>
      <div className="flex justify-between text-[10px] text-cream/40 mt-1 px-1.5">
        {labelIdx.map((idx) => (
          <span key={idx}>{shortDate(data[idx]?.date || '')}</span>
        ))}
      </div>
    </div>
  );
}

function shortDate(s: string) {
  if (!s) return '';
  const [, m, d] = s.split('-');
  if (!m || !d) return s;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1] || ''}`;
}

/* ── Heatmap (weekday × hour) ────────────────────────────────── */

interface HeatCell {
  dow: number;     // 0..6 Mon-first
  hour: number;    // 0..23
  count: number;
}

export function Heatmap({ cells, color = '#FFCC00' }: { cells: HeatCell[]; color?: string }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const { matrix, max } = useMemo(() => {
    const m = Array.from({ length: 7 }, () => Array<number>(24).fill(0));
    let mx = 0;
    for (const c of cells) {
      if (c.dow >= 0 && c.dow < 7 && c.hour >= 0 && c.hour < 24) {
        m[c.dow][c.hour] += c.count || 0;
        if (m[c.dow][c.hour] > mx) mx = m[c.dow][c.hour];
      }
    }
    return { matrix: m, max: mx || 1 };
  }, [cells]);

  return (
    <div className="overflow-x-auto">
      <table className="text-[10px] text-cream/40 border-separate" style={{ borderSpacing: 2 }}>
        <thead>
          <tr>
            <th />
            {Array.from({ length: 24 }).map((_, h) => (
              <th key={h} className={`px-0.5 ${h % 6 === 0 ? '' : 'opacity-30'}`} style={{ minWidth: 14 }}>
                {h % 6 === 0 ? `${h}h` : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, di) => (
            <tr key={di}>
              <td className="pr-2 text-right font-medium text-cream/60">{days[di]}</td>
              {row.map((v, hi) => {
                const intensity = v / max;
                const op = v === 0 ? 0.05 : 0.18 + intensity * 0.82;
                return (
                  <td
                    key={hi}
                    title={`${days[di]} ${hi}:00 — ${v}`}
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 2,
                      background: v === 0 ? 'rgba(245,240,232,0.05)' : color,
                      opacity: op,
                    }}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
