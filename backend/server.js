require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const logger = require('./config/logger');
const publicRoutes = require('./routes/public');
const webhookRoutes = require('./routes/webhook');
const authRoutes = require('./routes/admin/auth');
const enquiryAdminRoutes = require('./routes/admin/enquiries');
const dashboardRoutes = require('./routes/admin/dashboard');
const templateRoutes = require('./routes/admin/templates');
const siteImageRoutes = require('./routes/admin/siteImages');

const app = express();

/* ─── Middleware ─────────────────────────────────────────────────── */
app.set('trust proxy', 1);

app.use(helmet());

const DEFAULT_ALLOWED = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://tvkgallery.vercel.app',
  'https://tvkadmin.vercel.app',
];

const envAllowed = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const allowed = envAllowed.length ? envAllowed : DEFAULT_ALLOWED;

const isAllowedOrigin = (origin) => {
  if (allowed.includes(origin)) return true;
  try {
    const host = new URL(origin).hostname;
    if (host.endsWith('.vercel.app')) return true;
  } catch {
    // Not a parseable URL.
  }
  return false;
};

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (isAllowedOrigin(origin)) return cb(null, origin);
      logger.warn('[cors] blocked origin', { origin });
      return cb(null, false);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev', { stream: logger.stream }));

/* ─── Health ─────────────────────────────────────────────────────── */
app.get('/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));
app.get('/', (_req, res) => res.json({ ok: true, service: 'venkatraman-backend' }));

/* ─── Routes ─────────────────────────────────────────────────────── */
app.use('/api/public', publicRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/enquiries', enquiryAdminRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/admin/templates', templateRoutes);
app.use('/api/admin/site-images', siteImageRoutes);

/* ─── 404 + error handlers ──────────────────────────────────────── */
app.use((req, res) => res.status(404).json({ error: 'Not found', path: req.path }));

app.use((err, _req, res, _next) => {
  logger.error('[server] unhandled error', err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

/* ─── Boot ───────────────────────────────────────────────────────── */
const PORT = process.env.PORT || 5050;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('[mongo] connected');
    app.listen(PORT, () => logger.info('[server] listening', { port: PORT }));
  })
  .catch((err) => {
    logger.error('[mongo] connection failed', err);
    process.exit(1);
  });
