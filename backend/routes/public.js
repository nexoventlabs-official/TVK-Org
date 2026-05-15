const express = require('express');
const rateLimit = require('express-rate-limit');

const Enquiry = require('../models/Enquiry');
const SiteImage = require('../models/SiteImage');
const { dispatchEnquiryConfirmation } = require('../services/dispatch');
const { normalisePhone } = require('../services/metaCloud');
const logger = require('../config/logger');
const { validateBody } = require('../middleware/validate');
const { publicEnquirySchema } = require('../validation/schemas');

const router = express.Router();

/**
 * Public form-submission endpoint used by the marketing site's three
 * enquiry forms (Party / Assembly / Education). Stores the enquiry
 * synchronously, then fires off the category-appropriate WhatsApp
 * confirmation in the background so the visitor always sees a fast
 * success response.
 */

const submitLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/enquiries', submitLimiter, validateBody(publicEnquirySchema), async (req, res) => {
  try {
    const { category, name, mobile, email = '', request } = req.body || {};
    // ── Normalise the mobile so all DB records share one canonical
    //    format (digits only, with India 91 prefix when only 10 digits
    //    were given). This is what the duplicate-guard and the WhatsApp
    //    contact tracker both key on, so lookups stay deterministic
    //    regardless of how the visitor typed the number.
    const normalised = normalisePhone(mobile);
    if (!normalised) {
      return res.status(400).json({ error: 'Invalid mobile number' });
    }

    // ── Duplicate guard: one mobile can submit one of each category,
    //    but a second attempt at the SAME category is blocked. The $or
    //    backstop catches any legacy records that pre-date the
    //    normalisation rule.
    const existing = await Enquiry.findOne({
      category,
      $or: [
        { mobile: normalised },
        { mobile: mobile.trim() },
      ],
    }).lean();

    if (existing) {
      return res.status(409).json({
        ok: false,
        error: 'already_submitted',
        message: 'You have already submitted an enquiry under this category. Our team will get back to you shortly.',
        category,
        submittedAt: existing.createdAt,
      });
    }

    const enquiry = await Enquiry.create({
      category,
      name,
      mobile: normalised,
      email: email || '',
      request,
      ip: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
    });

    // Reply immediately; dispatch WA in the background. The result of
    // the dispatch is persisted onto the enquiry so the admin sees the
    // outcome (sent / skipped / failed).
    res.status(201).json({
      ok: true,
      id: String(enquiry._id),
      category: enquiry.category,
      createdAt: enquiry.createdAt,
    });

    dispatchEnquiryConfirmation(enquiry)
      .then(({ log, status }) => {
        enquiry.waLog.push(log);
        enquiry.waLastStatus = status;
        return enquiry.save();
      })
      .catch((err) => logger.error('[dispatch] post-save failed', err));
  } catch (err) {
    logger.error('[public/enquiries] error', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

/**
 * GET /api/public/site-images
 *   Returns a flat { slot: url } map of every image the admin has
 *   uploaded for the public site, plus the upload timestamps so the
 *   client can decide whether to refresh its cache.
 *
 *   This endpoint is read-only and intentionally unauthenticated; it
 *   only ever returns absolute Cloudinary CDN URLs for images the
 *   admin has explicitly published.
 */
router.get('/site-images', async (_req, res) => {
  try {
    const records = await SiteImage.find().select('slot url updatedAt').lean();
    const images = {};
    for (const r of records) {
      images[r.slot] = { url: r.url, updatedAt: r.updatedAt };
    }
    // Tell intermediaries they can cache this for 30s; admins
    // refreshing right after uploading still see fresh URLs because
    // Cloudinary public IDs are stable per slot.
    res.set('Cache-Control', 'public, max-age=30');
    res.json({ ok: true, images });
  } catch (err) {
    logger.error('[public/site-images] failed', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
