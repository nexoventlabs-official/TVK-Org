import { afterEach, describe, expect, it, vi } from 'vitest';

import { capitalizeFirst, formatDate, formatPhoneNumber, truncateText } from '../format';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('format utilities', () => {
  it('formats dates using the en-IN locale', () => {
    const spy = vi
      .spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValue('15 May 2026');

    expect(formatDate(new Date('2026-05-15T00:00:00Z'))).toBe('15 May 2026');
    expect(spy).toHaveBeenCalledWith(
      'en-IN',
      expect.objectContaining({
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  });

  it('formats 10-digit phone numbers and leaves non-matching values untouched', () => {
    expect(formatPhoneNumber('9876543210')).toBe('+91-987-654-3210');
    expect(formatPhoneNumber('+91 9876543210')).toBe('+91 9876543210');
    expect(formatPhoneNumber('555')).toBe('555');
  });

  it('truncates text and capitalizes strings consistently', () => {
    expect(truncateText('1234567890', 5)).toBe('12345...');
    expect(truncateText('short', 10)).toBe('short');
    expect(capitalizeFirst('mYLApoRe')).toBe('Mylapore');
  });
});