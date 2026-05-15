import { createRequire } from 'module';

import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);

const {
  adminEnquiriesQuerySchema,
  adminEnquiryUpdateSchema,
  adminLoginSchema,
  adminTemplateUpsertSchema,
  publicEnquirySchema,
  siteImageSlotParamsSchema,
} = require('../schemas');

describe('backend validation schemas', () => {
  it('accepts and trims a valid public enquiry payload', () => {
    const parsed = publicEnquirySchema.parse({
      category: 'party',
      name: '  Bala  ',
      mobile: '9876543210',
      email: '  bala@example.com  ',
      request: '  Need support for the event  ',
    });

    expect(parsed).toEqual({
      category: 'party',
      name: 'Bala',
      mobile: '9876543210',
      email: 'bala@example.com',
      request: 'Need support for the event',
    });
  });

  it('rejects malformed public enquiry emails', () => {
    expect(() =>
      publicEnquirySchema.parse({
        category: 'party',
        name: 'Bala',
        mobile: '9876543210',
        email: 'not-an-email',
        request: 'Need support for the event',
      })
    ).toThrow();
  });

  it('validates admin login credentials and admin query params', () => {
    expect(
      adminLoginSchema.parse({
        email: 'ADMIN@example.com',
        password: 'secret123',
      })
    ).toEqual({
      email: 'ADMIN@example.com',
      password: 'secret123',
    });

    expect(
      adminEnquiriesQuerySchema.parse({
        category: 'assembly',
        status: 'new',
        q: '  my enquiry  ',
        page: '2',
        limit: '25',
      })
    ).toEqual({
      category: 'assembly',
      status: 'new',
      q: 'my enquiry',
      page: 2,
      limit: 25,
    });

    expect(
      adminEnquiriesQuerySchema.parse({
        category: 'party',
        status: '',
        q: '',
        limit: '100',
      })
    ).toEqual({
      category: 'party',
      status: undefined,
      q: undefined,
      page: 1,
      limit: 100,
    });
  });

  it('validates admin template and enquiry update payloads', () => {
    expect(
      adminTemplateUpsertSchema.parse({
        label: '  General reply  ',
        bodyText: '  Thanks for reaching out.  ',
      })
    ).toEqual({
      label: 'General reply',
      bodyText: 'Thanks for reaching out.',
      language: 'en_US',
    });

    expect(() => adminEnquiryUpdateSchema.parse({})).toThrow('No fields to update');
  });

  it('validates image slot params', () => {
    expect(siteImageSlotParamsSchema.parse({ slot: 'hero_portrait' })).toEqual({
      slot: 'hero_portrait',
    });
    expect(() => siteImageSlotParamsSchema.parse({ slot: 'missing_slot' })).toThrow('Unknown slot');
  });
});