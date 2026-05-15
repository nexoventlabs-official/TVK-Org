import { describe, expect, it } from 'vitest';

import {
  isValidEmail,
  isValidMessage,
  isValidName,
  isValidPhone,
  sanitizeInput,
} from '../validation';

describe('validation utilities', () => {
  it('accepts a normal email address and rejects malformed values', () => {
    expect(isValidEmail('admin@example.com')).toBe(true);
    expect(isValidEmail('not-an-email')).toBe(false);
  });

  it('accepts valid Indian mobile numbers after cleaning separators', () => {
    expect(isValidPhone('9876543210')).toBe(true);
    expect(isValidPhone('98765-43210')).toBe(true);
    expect(isValidPhone('12345')).toBe(false);
  });

  it('enforces name and message length boundaries', () => {
    expect(isValidName('P V')).toBe(true);
    expect(isValidName('A')).toBe(false);
    expect(isValidMessage('This is a valid enquiry message.')).toBe(true);
    expect(isValidMessage('short')).toBe(false);
  });

  it('sanitizes angle brackets and trims surrounding whitespace', () => {
    expect(sanitizeInput('  <script>alert(1)</script>  ')).toBe('scriptalert(1)/script');
  });
});