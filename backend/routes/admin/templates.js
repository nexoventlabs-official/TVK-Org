const express = require('express');
const MessageTemplate = require('../../models/MessageTemplate');
const auth = require('../../middleware/auth');
const logger = require('../../config/logger');
const { validateBody, validateParams } = require('../../middleware/validate');
const {
  adminTemplateCategoryParamsSchema,
  adminTemplateUpsertSchema,
} = require('../../validation/schemas');

const router = express.Router();
router.use(auth);

router.get('/', async (_req, res) => {
  const list = await MessageTemplate.find({}).sort({ category: 1 }).lean();
  res.json({ items: list });
});

router.get('/:category', validateParams(adminTemplateCategoryParamsSchema), async (req, res) => {
  const t = await MessageTemplate.findOne({ category: req.params.category }).lean();
  if (!t) return res.status(404).json({ error: 'Not found' });
  res.json(t);
});

/** Upsert by category. */
router.put('/:category', validateParams(adminTemplateCategoryParamsSchema), validateBody(adminTemplateUpsertSchema), async (req, res) => {
  try {
    const { label, bodyText, ctaLabel = '', ctaUrl = '', language = 'en_US', metaTemplateName = '' } = req.body || {};

    const t = await MessageTemplate.findOneAndUpdate(
      { category: req.params.category },
      { $set: { label, bodyText, ctaLabel, ctaUrl, language, metaTemplateName } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(t);
  } catch (err) {
    logger.error('[admin/templates] error', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
