const mongoose = require('mongoose');

/**
 * A citizen enquiry submitted via the public marketing site.
 *
 * One of three categories:
 *   - party     → Kalagam Pani (cadre, programmes, coordination)
 *   - assembly  → Mylapore Assembly (constituency issues, development)
 *   - education → Tamil Nadu Education (schools, teachers, policy)
 *
 * The lifecycle status mirrors what is shown on the admin Kanban board
 * and the response timestamp/note tracks any direct follow-up made by
 * the back-office.
 */

const ENQUIRY_CATEGORIES = ['party', 'assembly', 'education'];
const ENQUIRY_STATUSES = ['new', 'in_progress', 'resolved', 'rejected'];

const WhatsAppLogSchema = new mongoose.Schema(
  {
    sentAt: { type: Date, default: Date.now },
    ok: { type: Boolean, default: false },
    kind: { type: String, enum: ['text', 'interactive', 'template'], default: 'text' },
    messageId: { type: String, default: '' },
    error: { type: String, default: '' },
    // Snapshot of the body/CTA actually sent so we keep an audit trail
    // even if the underlying template is edited later.
    body: { type: String, default: '' },
    ctaLabel: { type: String, default: '' },
    ctaUrl: { type: String, default: '' },
  },
  { _id: false }
);

const EnquirySchema = new mongoose.Schema(
  {
    category: { type: String, enum: ENQUIRY_CATEGORIES, required: true, index: true },

    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true, index: true },
    email: { type: String, default: '', trim: true, lowercase: true },
    request: { type: String, required: true, trim: true },

    status: { type: String, enum: ENQUIRY_STATUSES, default: 'new', index: true },
    notes: { type: String, default: '' },

    // WhatsApp delivery log — the most recent attempt sits at the end.
    waLog: { type: [WhatsAppLogSchema], default: [] },
    waLastStatus: { type: String, enum: ['', 'sent', 'failed', 'skipped'], default: '' },

    // Minor metadata so the admin can debug spam / track sources.
    ip: { type: String, default: '' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true }
);

EnquirySchema.index({ createdAt: -1 });
EnquirySchema.index({ category: 1, createdAt: -1 });
EnquirySchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Enquiry', EnquirySchema);
module.exports.ENQUIRY_CATEGORIES = ENQUIRY_CATEGORIES;
module.exports.ENQUIRY_STATUSES = ENQUIRY_STATUSES;
