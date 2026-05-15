import { useState, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../lib/auth';

/**
 * Single-screen login. Uses the shared dark/cream theme; top accent bar
 * matches the marketing site's enquiry cards. Bouncing the user back to
 * the dashboard if they're already signed in keeps the URL bar honest.
 */
export default function Login() {
  const { login, user } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('admin@venkatraman.in');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      await login(email.trim(), password);
      nav('/dashboard');
    } catch (e: any) {
      setErr(e?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-ink-0 px-6">
      <form onSubmit={submit} className="w-full max-w-sm card overflow-hidden">
        <div className="h-[3px] bg-brand-maroon" />
        <div className="px-7 py-7">
          <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-brand-gold mb-1">
            Venkatramanan · Admin
          </div>
          <h1 className="font-display text-cream text-xl font-bold mb-1">Sign in</h1>
          <p className="text-[12px] text-cream/50 mb-6">
            Use your admin credentials. Sessions last 7 days.
          </p>

          <label className="label">Email</label>
          <div className="relative mb-3">
            <Mail size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-cream/30" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input pl-9"
              placeholder="admin@venkatraman.in"
              autoComplete="email"
            />
          </div>

          <label className="label">Password</label>
          <div className="relative mb-4">
            <Lock size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-cream/30" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-9"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {err && (
            <div className="flex items-start gap-1.5 mb-3 text-[11px] text-red-300/90 bg-red-500/10 border border-red-500/30 rounded-sm px-3 py-2">
              <AlertCircle size={12} className="mt-0.5 shrink-0" />
              <span>{err}</span>
            </div>
          )}

          <button type="submit" className="btn-primary w-full" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="mt-6 text-[10px] text-cream/30 leading-relaxed">
            Default: <span className="text-cream/60">admin@venkatraman.in</span> / <span className="text-cream/60">admin@123</span><br />
            Run <code className="text-cream/60">npm run seed</code> once on the backend to create it.
          </div>
        </div>
      </form>
    </div>
  );
}
