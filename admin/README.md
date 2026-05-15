# Venkatraman Admin

Vite + React + TypeScript admin SPA for managing enquiries submitted
through the public marketing site. Same dark + cream theme as the
parent site (`venkatraman-main`).

## Pages

- **Login** — token-based auth against `/api/admin/auth/login`
- **Dashboard** — stat cards, status donut, by-category bars, daily
  timeline, weekday × hour heatmap, recent enquiries
- **Party / Assembly / Education** — three category-specific list
  pages with search, status filter, slide-in drawer for status &
  notes updates and WhatsApp resend
- **Templates** — edit the 3 confirmation messages (`{{name}}`
  placeholder, CTA URL, and the Meta template name once approved)

## Setup

```bash
cd admin
npm install
cp .env.example .env       # set VITE_API_URL if backend not on :5050
npm run dev                # http://localhost:5174
```

Make sure the backend is running on the URL configured in
`VITE_API_URL` (defaults to `http://localhost:5050/api`).
