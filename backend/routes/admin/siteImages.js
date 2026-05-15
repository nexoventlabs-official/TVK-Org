/**
 * Admin "Photos" page back-end.
 *
 *   GET    /api/admin/site-images
 *     → returns the full slot catalog merged with whatever has been
 *       uploaded so far. Empty slots come back with image: null so the
 *       admin UI can render an "Upload" placeholder card.
 *
 *   POST   /api/admin/site-images/:slot
 *     → multipart/form-data, single field "file". Streams the file to
 *       Cloudinary (overwrite per slot key), upserts the SiteImage
 *       record, and returns the resulting URL + metadata.
 *
 *   DELETE /api/admin/site-images/:slot
 *     → removes the asset from Cloudinary AND deletes the DB row so
 *       the public site falls back to its original placeholder.
 */

const express = require('express');
const multer = require('multer');

const auth = require('../../middleware/auth');
const SiteImage = require('../../models/SiteImage');
const cloudinarySvc = require('../../services/cloudinaryService');
const { IMAGE_SLOTS, findSlot } = require('../../config/imageSlots');
const logger = require('../../config/logger');
const { validateParams } = require('../../middleware/validate');
const { siteImageSlotParamsSchema } = require('../../validation/schemas');

const router = express.Router();
router.use(auth);

// 8 MB cap is plenty for marketing imagery; reject anything bigger
// before we even hit Cloudinary so abusive uploads fail fast.
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|bmp|tiff?|avif|heic|heif|svg)$/i;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const looksImage =
      /^image\//i.test(file.mimetype) || IMAGE_EXT.test(file.originalname || '');
    if (!looksImage) {
      return cb(new Error('Only image files are accepted'));
    }
    cb(null, true);
  },
});

function shape(record) {
  if (!record) return null;
  return {
    url: record.url,
    publicId: record.publicId,
    width: record.width,
    height: record.height,
    format: record.format,
    bytes: record.bytes,
    updatedAt: record.updatedAt,
  };
}

/**
 * GET /api/admin/site-images
 * Returns: { items: [{ ...slot, image: null | { url, … } }] }
 */
router.get('/', async (_req, res) => {
  try {
    const records = await SiteImage.find().lean();
    const bySlot = new Map(records.map((r) => [r.slot, r]));
    const items = IMAGE_SLOTS.map((s) => ({
      ...s,
      image: shape(bySlot.get(s.slot)),
    }));
    res.json({
      ok: true,
      cloudinaryConfigured: cloudinarySvc.isConfigured(),
      items,
    });
  } catch (err) {
    logger.error('[site-images] list failed', err);
    res.status(500).json({ error: err.message || 'Failed to load images' });
  }
});

/**
 * POST /api/admin/site-images/:slot
 * Body: multipart/form-data with field "file".
 */
router.post('/:slot', validateParams(siteImageSlotParamsSchema), upload.single('file'), async (req, res) => {
  const { slot } = req.params;
  try {
    const slotDef = findSlot(slot);
    if (!slotDef) return res.status(404).json({ error: `Unknown slot "${slot}"` });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded (field name must be "file")' });
    if (!cloudinarySvc.isConfigured()) {
      return res.status(500).json({
        error: 'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET in backend/.env.',
      });
    }

    const result = await cloudinarySvc.uploadBuffer(req.file.buffer, { slot });

    const record = await SiteImage.findOneAndUpdate(
      { slot },
      {
        slot,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width || 0,
        height: result.height || 0,
        format: result.format || '',
        bytes: result.bytes || 0,
        uploadedBy: req.admin?.email || '',
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ ok: true, slot: slotDef, image: shape(record) });
  } catch (err) {
    logger.error(`[site-images] upload "${slot}" failed`, err);
    res.status(err?.http_code || 500).json({
      error: err?.message || 'Upload failed',
    });
  }
});

/**
 * DELETE /api/admin/site-images/:slot
 * Removes the Cloudinary asset and the DB record.
 */
router.delete('/:slot', validateParams(siteImageSlotParamsSchema), async (req, res) => {
  const { slot } = req.params;
  try {
    const slotDef = findSlot(slot);
    if (!slotDef) return res.status(404).json({ error: `Unknown slot "${slot}"` });

    const record = await SiteImage.findOne({ slot });
    if (!record) return res.json({ ok: true, slot: slotDef, image: null });

    await cloudinarySvc.destroy(record.publicId);
    await SiteImage.deleteOne({ slot });

    res.json({ ok: true, slot: slotDef, image: null });
  } catch (err) {
    logger.error(`[site-images] delete "${slot}" failed`, err);
    res.status(500).json({ error: err.message || 'Delete failed' });
  }
});

// multer error handler — surface clean validation messages.
router.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  if (err) return res.status(400).json({ error: err.message || 'Bad request' });
  res.status(500).json({ error: 'Server error' });
});

module.exports = router;
