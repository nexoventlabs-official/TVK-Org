import { describe, expect, it } from 'vitest';

import { APP_DESCRIPTION, APP_NAME, ENQUIRY_CATEGORIES, IMAGE_SLOTS, ROUTES } from '../constants';

describe('application constants', () => {
  it('exposes the expected brand metadata', () => {
    expect(APP_NAME).toContain('P. Venkataramanan');
    expect(APP_DESCRIPTION).toContain('Official website');
  });

  it('keeps the core route map stable', () => {
    expect(ROUTES).toMatchObject({
      HOME: '/',
      ABOUT: '/about',
      GALLERY: '/gallery',
      NEWS: '/news',
      KALAGAM: '/kalagam',
      ASSEMBLY: '/assembly',
      EDUCATION: '/education',
    });
  });

  it('keeps the expected enquiry categories and image slots', () => {
    expect(Object.values(ENQUIRY_CATEGORIES)).toEqual(['party', 'assembly', 'education']);
    expect(IMAGE_SLOTS.HERO_PORTRAIT).toBe('hero_portrait');
    expect(IMAGE_SLOTS.GALLERY_7).toBe('gallery_7');
  });
});