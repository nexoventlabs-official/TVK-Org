import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, GraduationCap, MessageSquareText, ImagePlus, LogOut } from 'lucide-react';
import { useAuth } from '../lib/auth';

/**
 * Persistent app shell with a left sidebar (brand mark, primary nav,
 * user / logout) and a topbar showing the current section. Mirrors
 * the parent marketing site's dark-on-cream typography (Merriweather
 * for headlines, Poppins for everything else).
 */

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, eyebrow: 'Overview' },
  { to: '/enquiries/party', label: 'Party', icon: Users, eyebrow: 'TVK · Kalagam Pani', accent: '#FFCC00' },
  { to: '/enquiries/assembly', label: 'Assembly', icon: Building2, eyebrow: 'Mylapore Assembly', accent: '#93C5FD' },
  { to: '/enquiries/education', label: 'Education', icon: GraduationCap, eyebrow: 'Tamil Nadu', accent: '#86EFAC' },
  { to: '/templates', label: 'Templates', icon: MessageSquareText, eyebrow: 'WhatsApp messaging' },
  { to: '/photos', label: 'Photos', icon: ImagePlus, eyebrow: 'Public site imagery' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  const current = NAV.find((n) => loc.pathname.startsWith(n.to));

  return (
    <div className="min-h-screen flex bg-ink-0">
      {/* ─── Sidebar ─── */}
      <aside className="w-[260px] shrink-0 bg-ink-50 border-r border-cream/[0.08] flex flex-col">
        <div className="px-6 py-7 border-b border-cream/[0.06]">
          <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-brand-gold mb-1">
            Venkatramanan · Admin
          </div>
          <div className="font-display font-bold text-cream text-lg leading-tight">
            Office Portal
          </div>
        </div>

        <nav className="flex-1 py-4">
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  [
                    'group flex items-center gap-3 px-6 py-3 border-l-2 transition-colors',
                    isActive
                      ? 'border-brand-gold bg-cream/[0.04] text-cream'
                      : 'border-transparent text-cream/55 hover:text-cream hover:bg-cream/[0.02]',
                  ].join(' ')
                }
              >
                <Icon size={16} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold tracking-wide">{n.label}</div>
                  <div className="text-[9px] uppercase tracking-[0.12em] text-cream/35 truncate">
                    {n.eyebrow}
                  </div>
                </div>
                {n.accent && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: n.accent }} />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-cream/[0.06]">
          <div className="text-[10px] uppercase tracking-[0.14em] text-cream/40 mb-1">Signed in</div>
          <div className="text-[12px] text-cream truncate" title={user?.email}>
            {user?.email || '—'}
          </div>
          <button
            onClick={logout}
            className="mt-3 w-full inline-flex items-center justify-center gap-1.5 h-8 text-[10px] uppercase tracking-[0.14em] text-cream/60 border border-cream/15 rounded-sm hover:text-cream hover:bg-cream/[0.04]"
          >
            <LogOut size={12} /> Sign out
          </button>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <main className="flex-1 min-w-0 flex flex-col">
        <div className="border-b border-cream/[0.06] bg-ink-50/50 backdrop-blur px-8 py-5">
          <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-cream/40 mb-1">
            {current?.eyebrow || 'Admin'}
          </div>
          <h1 className="font-display font-bold text-cream text-xl">
            {current?.label || 'Dashboard'}
          </h1>
        </div>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
