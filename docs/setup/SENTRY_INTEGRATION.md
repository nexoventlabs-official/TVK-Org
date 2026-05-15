# Sentry Error Monitoring Setup

This guide sets up error monitoring with Sentry for the Venkataramanan project.

## Step 1: Create Sentry Account & Project

1. Go to https://sentry.io
2. Sign up (use GitHub or email)
3. Create a new organization (e.g., "Venkataramanan")
4. Create three projects:
   - **Frontend** (React)
   - **Admin Panel** (React)
   - **Backend** (Node.js)
5. For each project, Sentry will provide a **DSN** (Data Source Name) — save these

## Step 2: Install Sentry SDKs

### Backend (Node.js)

```bash
cd backend
npm install @sentry/node @sentry/tracing
```

Add to `backend/server.js` (right after imports, BEFORE any middleware):

```javascript
const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

// Initialize Sentry FIRST
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      nodeProfilingIntegration(),
    ],
  });
}

const app = express();

// Add Sentry request handler
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// ... rest of your middleware ...

// Add Sentry error handler (LAST middleware)
app.use(Sentry.Handlers.errorHandler());
```

### Frontend (React - Main Site)

```bash
cd .
npm install @sentry/react @sentry/tracing
```

Add to `src/start.ts` (or create a new `src/sentry-init.ts`):

```typescript
import * as Sentry from "@sentry/react";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 1.0,
    integrations: [
      Sentry.replayIntegration(),
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
```

Then wrap your root component:

```typescript
export const Root = Sentry.withProfiler(() => {
  // your component
});
```

### Admin Panel (React)

```bash
cd admin
npm install @sentry/react @sentry/tracing
```

Add to `admin/src/main.tsx`:

```typescript
import * as Sentry from "@sentry/react";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 1.0,
  });
}
```

Then wrap your App component in `admin/src/main.tsx`:

```typescript
const App = Sentry.withProfiler(AdminApp);
render(<App />, document.getElementById('root'));
```

## Step 3: Add Environment Variables

### `.env` files

**backend/.env:**
```
SENTRY_DSN=https://xxxxx@sentry.io/1234567
```

**frontend .env:**
```
VITE_SENTRY_DSN=https://xxxxx@sentry.io/2345678
```

**admin/.env:**
```
VITE_SENTRY_DSN=https://xxxxx@sentry.io/3456789
```

## Step 4: Configure Sentry in Production

1. Go to your project in Sentry dashboard
2. Settings → Release Tracking
3. Add your deployment providers (Vercel, GitHub, etc.)
4. Set up alerts:
   - Settings → Alerts
   - Create rule: "Alert on every new error"
   - Choose notification channel (email, Slack, etc.)

## Step 5: Test the Integration

### Backend test:
```javascript
// In a route, add:
throw new Error("Test Sentry error");
```

### Frontend test:
```javascript
Sentry.captureException(new Error("Test Sentry error"));
```

Check Sentry dashboard within 1-2 minutes — error should appear.

## Step 6: Configure Error Context (Optional)

Add user context to errors:

**Frontend/Admin:**
```typescript
Sentry.setUser({ id, email });
```

**Backend:**
```javascript
Sentry.setUser({ id: req.admin.id, email: req.admin.email });
```

---

## Next Steps

- [ ] Create Sentry organization & 3 projects
- [ ] Save all DSN values
- [ ] Install SDKs in all 3 apps
- [ ] Update .env files
- [ ] Test integration
- [ ] Set up alerts
- [ ] Monitor error dashboard daily 🎯
