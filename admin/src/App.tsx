import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './lib/auth';
import { ErrorBoundary } from './components/ErrorBoundary';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import Templates from './pages/Templates';
import Photos from './pages/Photos';

/**
 * The admin shell: a single guarded layout containing the dashboard,
 * three category-specific enquiry pages, and the templates editor.
 * Unauthenticated visits land on /login; once authenticated the user
 * is sent to /dashboard.
 */

function Protected({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <div className="text-cream/40 text-xs uppercase tracking-[0.2em]">Loading…</div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Protected>
              <Layout />
            </Protected>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="enquiries/party" element={<Enquiries category="party" />} />
          <Route path="enquiries/assembly" element={<Enquiries category="assembly" />} />
          <Route path="enquiries/education" element={<Enquiries category="education" />} />
          <Route path="templates" element={<Templates />} />
          <Route path="photos" element={<Photos />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
