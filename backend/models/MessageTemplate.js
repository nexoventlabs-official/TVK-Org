const mongoose = require('mongoose');

/**
 * One WhatsApp confirmation template per enquiry category. Stored in
 * MongoDB so the admin can edit copy without touching code. Today the
 * dispatcher renders these as free-form text (so it only works during
 * an open 24h conversation window). Once a matching template is
 * approved on Meta, set `metaTemplateName` to swap to native template
 * sends with a real CTA URL button — the dispatcher already handles
 * both branches.
 */

const TemplateSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['party', 'assembly', 'education'],
      required: true,
      unique: true,
      index: true,
    },

    // Display-only label (e.g. "Party Enquiry Confirmation")
    label: { type: String, required: true, trim: true },

    // Free-form body. May reference {{name}} which the dispatcher
    // substitutes with the enquirer's name.
    bodyText: { type: String, required: true, trim: true },

    // Optional CTA — when rendered as text we append it as a "🔗 Label:
    // https://..." footer. When rendered as a Meta template we wire it
    // to a CTA URL button.
    ctaLabel: { type: String, default: '' },
    ctaUrl: { type: String, default: '' },

    language: { type: String, default: 'en_US' },

    // Once a Meta template is approved, set this to its `name`. The
    // dispatcher will then prefer template-send (which works outside
    // the 24h window) over free-form text.
    metaTemplateName: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MessageTemplate', TemplateSchema);
