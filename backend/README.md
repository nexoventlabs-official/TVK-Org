# Venkatraman Backend

Express + Mongoose API powering the public enquiry form on
`venkatraman-main` and the admin panel under `venkatraman-main/admin`.

## What it does

1. **`POST /api/public/enquiries`** — accepts `category`, `name`,
   `mobile`, `email?`, `request` from the marketing site. Stores the
   enquiry, then asynchronously sends a WhatsApp confirmation using
   the matching template stored in MongoDB.
2. **`GET / PATCH / DELETE /api/admin/enquiries`** — list, update, and
   delete enquiries (Bearer-token auth).
3. **`GET /api/admin/dashboard`** — pre-computed stats, status
   breakdown, by-category counts, daily timeline, and weekday × hour
   heatmap.
4. **`GET / PUT /api/admin/templates`** — manage the 3 confirmation
   templates (one per category).
5. **`GET / POST /api/webhook`** — Meta webhook for verification (GET)
   and inbound message tracking (POST). Inbound timestamps drive the
   24h conversation window check.

## 24h-window send strategy

Per category, the dispatcher picks one of three paths:

1. If the template has a `metaTemplateName`, send via Meta's template
   API (works any time once the template is approved).
2. Else, if the recipient has sent us a message in the last 24h,
   send free-form text (with the body + CTA URL appended).
3. Else, mark `waLastStatus = 'skipped'` with a clear error so the
   admin can retry once an approved template is configured.

This is exactly the policy described in the brief: "as of now create
templates in MongoDB, and if user has the 24h window then send" —
once a Meta-approved template exists you just paste its `name` into
the Templates page and the dispatcher upgrades automatically.

## Setup

```bash
cd backend
npm install
cp .env.example .env       # already filled in for the dev cluster
npm run seed               # creates default admin + 3 templates
npm run dev                # http://localhost:5050  (Chrome blocks 5060 as ERR_UNSAFE_PORT)
```

Default admin: **admin@venkatraman.in / admin@123** — change in `.env`
before running seed in production.

## Endpoints

| Method | Path                                | Auth   |
|--------|-------------------------------------|--------|
| POST   | /api/public/enquiries               | none   |
| GET    | /api/webhook                        | Meta   |
| POST   | /api/webhook                        | Meta   |
| POST   | /api/admin/auth/login               | none   |
| GET    | /api/admin/auth/me                  | Bearer |
| GET    | /api/admin/enquiries?category=…     | Bearer |
| GET    | /api/admin/enquiries/:id            | Bearer |
| PATCH  | /api/admin/enquiries/:id            | Bearer |
| DELETE | /api/admin/enquiries/:id            | Bearer |
| POST   | /api/admin/enquiries/:id/resend     | Bearer |
| GET    | /api/admin/dashboard                | Bearer |
| GET    | /api/admin/templates                | Bearer |
| GET    | /api/admin/templates/:category      | Bearer |
| PUT    | /api/admin/templates/:category      | Bearer |
