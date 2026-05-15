require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const MessageTemplate = require('../models/MessageTemplate');

/**
 * Idempotent seed:
 *   - Ensures one default admin (from .env)
 *   - Ensures the three category templates exist (only inserts when
 *     missing — never overwrites existing copy you've edited in the UI)
 *
 * Run: `npm run seed`
 */

const DEFAULT_TEMPLATES = [
  {
    category: 'party',
    label: 'Party Enquiry Confirmation',
    bodyText:
      'Vanakkam {{name}} 🙏\n\nThank you for reaching out to TVK Kalagam Pani. We have received your enquiry and our cadre coordination team will get back to you within 24 hours.\n\nFor immediate party matters, you can visit our office or reply to this message.',
    ctaLabel: 'Visit Kalagam page',
    ctaUrl: 'https://venkatramanan.org/kalagam',
    language: 'en_US',
  },
  {
    category: 'assembly',
    label: 'Assembly Enquiry Confirmation',
    bodyText:
      'Vanakkam {{name}} 🙏\n\nYour Mylapore Assembly enquiry has been logged with MLA Venkatramanan\'s office. Our constituency team will review your request and respond within 7 working days.\n\nQuote this number when you contact the office for faster service.',
    ctaLabel: 'Assembly portal',
    ctaUrl: 'https://venkatramanan.org/assembly',
    language: 'en_US',
  },
  {
    category: 'education',
    label: 'Education Enquiry Confirmation',
    bodyText:
      'Vanakkam {{name}} 🙏\n\nThank you for your education-related enquiry. Our Tamil Nadu education portfolio team will look into your concern and connect with you shortly.\n\nFor urgent school/teacher matters, please mention the district in your reply.',
    ctaLabel: 'Education vertical',
    ctaUrl: 'https://venkatramanan.org/education',
    language: 'en_US',
  },
];

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('[seed] connected');

  // ─── Admin ─────────────────────────────────────────────
  const email = (process.env.DEFAULT_ADMIN_EMAIL || 'admin@venkatramanan.org').toLowerCase();
  let admin = await Admin.findOne({ email });
  if (!admin) {
    admin = new Admin({ email, name: 'Admin' });
    await admin.setPassword(process.env.DEFAULT_ADMIN_PASSWORD || 'admin@123');
    await admin.save();
    console.log(`[seed] created admin: ${email}`);
  } else {
    console.log(`[seed] admin already exists: ${email}`);
  }

  // ─── Templates ─────────────────────────────────────────
  for (const t of DEFAULT_TEMPLATES) {
    const exists = await MessageTemplate.findOne({ category: t.category });
    if (exists) {
      console.log(`[seed] template '${t.category}' already exists — skipping`);
      continue;
    }
    await MessageTemplate.create(t);
    console.log(`[seed] created template '${t.category}'`);
  }

  await mongoose.disconnect();
  console.log('[seed] done');
  process.exit(0);
})().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
