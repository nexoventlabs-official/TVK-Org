const express = require('express');
const Enquiry = require('../../models/Enquiry');
const auth = require('../../middleware/auth');
const { dispatchEnquiryConfirmation } = require('../../services/dispatch');
const logger = require('../../config/logger');
const { validateBody, validateParams, validateQuery } = require('../../middleware/validate');
const {
  adminEnquiriesQuerySchema,
  adminEnquiryIdParamsSchema,
  adminEnquiryUpdateSchema,
} = require('../../validation/schemas');

const router = express.Router();

router.use(auth);

/**
 * GET /api/admin/enquiries
 *   Query: ?category=party|assembly|education  (optional — list all if absent)
 *          ?status=new|in_progress|resolved|rejected
 *          ?q=search-string
 *          ?page=1&limit=50
 */
router.get('/', validateQuery(adminEnquiriesQuerySchema), async (req, res) => {
  try {
    const { category, status, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (q?.trim()) {
      const rx = new RegExp(q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ name: rx }, { mobile: rx }, { email: rx }, { request: rx }];
    }

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);

    const [items, total] = await Promise.all([
      Enquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Enquiry.countDocuments(filter),
    ]);

    res.json({ items, total, page, limit });
  } catch (err) {
    logger.error('[admin/enquiries GET] error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/** GET one */
router.get('/:id', validateParams(adminEnquiryIdParamsSchema), async (req, res) => {
  try {
    const item = await Enquiry.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch {
    res.status(400).json({ error: 'Bad id' });
  }
});

/** PATCH status / notes */
router.patch('/:id', validateParams(adminEnquiryIdParamsSchema), validateBody(adminEnquiryUpdateSchema), async (req, res) => {
  try {
    const { status, notes } = req.body || {};
    const upd = {};
    if (status) upd.status = status;
    if (typeof notes === 'string') upd.notes = notes;
    if (!Object.keys(upd).length) return res.status(400).json({ error: 'No fields to update' });
    const item = await Enquiry.findByIdAndUpdate(req.params.id, upd, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch {
    res.status(400).json({ error: 'Bad request' });
  }
});

/** DELETE one */
router.delete('/:id', validateParams(adminEnquiryIdParamsSchema), async (req, res) => {
  try {
    const r = await Enquiry.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch {
    res.status(400).json({ error: 'Bad id' });
  }
});

/** Retry sending the WhatsApp confirmation. */
router.post('/:id/resend', validateParams(adminEnquiryIdParamsSchema), async (req, res) => {
  try {
    const item = await Enquiry.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    const { log, status } = await dispatchEnquiryConfirmation(item);
    item.waLog.push(log);
    item.waLastStatus = status;
    await item.save();
    res.json({ ok: log.ok, status, log });
  } catch (err) {
    logger.error('[admin/enquiries resend] error', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
