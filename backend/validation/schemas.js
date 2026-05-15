const { z } = require('zod');
const { SLOT_KEYS } = require('../config/imageSlots');

const ENQUIRY_CATEGORIES = ['party', 'assembly', 'education'];
const ENQUIRY_STATUSES = ['new', 'in_progress', 'resolved', 'rejected'];
const TEMPLATE_CATEGORIES = ['party', 'assembly', 'education'];

const trimToUndefined = (value) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
};

const requiredText = (max) => z.string().trim().min(1).max(max);
const optionalText = (max) => z.preprocess(trimToUndefined, z.string().trim().max(max).optional());

const mongoIdSchema = z.string().trim().regex(/^[a-f0-9]{24}$/i, 'Invalid id');

const publicEnquirySchema = z.object({
  category: z.enum(ENQUIRY_CATEGORIES),
  name: requiredText(120),
  mobile: requiredText(20),
  email: z.preprocess(trimToUndefined, z.string().email().max(254).optional()),
  request: requiredText(4000),
});

const adminLoginSchema = z.object({
  email: requiredText(254).email(),
  password: requiredText(200),
});

const adminEnquiriesQuerySchema = z.object({
  category: z.preprocess(trimToUndefined, z.enum(ENQUIRY_CATEGORIES).optional()),
  status: z.preprocess(trimToUndefined, z.enum(ENQUIRY_STATUSES).optional()),
  q: optionalText(200),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

const adminEnquiryUpdateSchema = z
  .object({
    status: z.enum(ENQUIRY_STATUSES).optional(),
    notes: optionalText(4000),
  })
  .refine((value) => value.status !== undefined || value.notes !== undefined, {
    message: 'No fields to update',
  });

const adminEnquiryIdParamsSchema = z.object({
  id: mongoIdSchema,
});

const adminTemplateCategoryParamsSchema = z.object({
  category: z.enum(TEMPLATE_CATEGORIES),
});

const adminTemplateUpsertSchema = z.object({
  label: requiredText(120),
  bodyText: requiredText(4000),
  ctaLabel: optionalText(120).default(''),
  ctaUrl: optionalText(500).default(''),
  language: optionalText(20).default('en_US'),
  metaTemplateName: optionalText(120).default(''),
});

const siteImageSlotParamsSchema = z.object({
  slot: z.string().trim().refine((value) => SLOT_KEYS.has(value), 'Unknown slot'),
});

module.exports = {
  ENQUIRY_CATEGORIES,
  ENQUIRY_STATUSES,
  TEMPLATE_CATEGORIES,
  publicEnquirySchema,
  adminLoginSchema,
  adminEnquiriesQuerySchema,
  adminEnquiryUpdateSchema,
  adminEnquiryIdParamsSchema,
  adminTemplateCategoryParamsSchema,
  adminTemplateUpsertSchema,
  siteImageSlotParamsSchema,
};