const mongoose = require('mongoose');

/**
 * One document per uploaded slot. Slot keys come from
 * config/imageSlots.js and are unique. The `publicId` is what we hand
 * to Cloudinary on delete; the `url` is what the public site renders.
 */
const SiteImageSchema = new mongoose.Schema(
  {
    slot: { type: String, required: true, unique: true, index: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    format: { type: String, default: '' },
    bytes: { type: Number, default: 0 },
    uploadedBy: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteImage', SiteImageSchema);
