import React, { createContext, useContext, useEffect, useState } from 'react';
import api from './api';

interface AdminUser {
  id: string;
  email: string;
  name: string;
}

interface AuthCtx {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const raw = localStorage.getItem('venkat_admin_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Validate the cached token in the background — if it's expired the
  // 401 interceptor will boot the user back to /login.
  useEffect(() => {
    const token = localStorage.getItem('venkat_admin_token');
    if (!token) { setLoading(false); return; }
    api.get('/admin/auth/me')
      .then((r: any) => {
        const u = { id: r.data.id, email: r.data.email, name: r.data.name };
        setUser(u);
        localStorage.setItem('venkat_admin_user', JSON.stringify(u));
      })
      .catch(() => {
        localStorage.removeItem('venkat_admin_token');
        localStorage.removeItem('venkat_admin_user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const r = await api.post('/admin/auth/login', { email, password });
    localStorage.setItem('venkat_admin_token', r.data.token);
    const u = { id: r.data.admin.id, email: r.data.admin.email, name: r.data.admin.name };
    localStorage.setItem('venkat_admin_user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('venkat_admin_token');
    localStorage.removeItem('venkat_admin_user');
    setUser(null);
    location.href = '/login';
  };

  return <Ctx.Provider value={{ user, loading, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}
