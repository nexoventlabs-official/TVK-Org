const mongoose = require('mongoose');

/**
 * Tracks the 24h conversation window per phone number, populated from
 * inbound webhook events (Meta -> /api/webhook). If `lastInboundAt` is
 * within 24h, the dispatcher can send free-form text; otherwise it
 * must use a Meta template (or skip).
 */

const ContactSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true, index: true },
    lastInboundAt: { type: Date, default: null },
    lastOutboundAt: { type: Date, default: null },
    inboundCount: { type: Number, default: 0 },
    profileName: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WhatsAppContact', ContactSchema);
