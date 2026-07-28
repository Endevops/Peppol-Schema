import { describe, expect, it } from 'vitest';
import { isValidIBAN } from './is-valid-iban';

describe('isValidIBAN', () => {
  describe('valid IBANs', () => {
    it.each([
      ['GB82 WEST 1234 5698 7654 32', 'UK IBAN'],
      ['DE89370400440532013000', 'German IBAN'],
    ])('should validate %s (%s)', (value, description) => {
      expect(isValidIBAN(value)).toEqual(true);
    });
  });

  describe('invalid inputs', () => {
    it.each([
      ['GB82 WEST 1234 5698 7654 33', 'wrong check digits'],
      ['XX82 WEST 1234 5698 7654 32', 'invalid country code'],
      ['', 'empty string'],
    ])('should reject %s (%s)', (value, description) => {
      expect(isValidIBAN(value)).toEqual(false);
    });
  });
});
