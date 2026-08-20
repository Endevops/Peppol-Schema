import { describe, expect, it } from 'vitest';

import { checkCF } from './check-cf';

describe('checkCF', () => {
  describe('valid codes', () => {
    it.each([
      ['RSSMRA85T10A562S', '16 character code'],
      ['12345678901', '11 character numeric code'],
    ])('should validate %s (%s)', value => {
      expect(checkCF(value)).toEqual(true);
    });
  });

  describe('invalid inputs', () => {
    it.each([
      ['123456789', 'wrong length'],
      ['', 'empty string'],
    ])('should reject %s (%s)', value => {
      expect(checkCF(value)).toEqual(false);
    });
  });
});
