import axios from 'axios';

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5050/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('venkat_admin_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r: any) => r,
  (err: any) => {
    // Auto-bounce to /login on 401 so stale tokens don't trap the user.
    if (err?.response?.status === 401 && !location.pathname.endsWith('/login')) {
      localStorage.removeItem('venkat_admin_token');
      localStorage.removeItem('venkat_admin_user');
      location.href = '/login';
    }
    return Promise.reject(
      err?.response?.data?.error
        ? new Error(err.response.data.error)
        : err
    );
  }
);

export default api;
