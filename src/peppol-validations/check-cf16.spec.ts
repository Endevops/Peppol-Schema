import { describe, expect, it } from 'vitest';
import { checkCF16 } from './check-cf16';

describe('checkCF16', () => {
  describe('valid 16-character Italian fiscal codes', () => {
    it.each([
      ['RSSMRA85T10A562S', 'valid format 1'],
      ['BNCGRL75A01F205B', 'valid format 2'],
    ])('should validate %s (%s)', (value, description) => {
      expect(checkCF16(value)).toEqual(true);
    });
  });

  describe('invalid inputs', () => {
    it.each([
      ['RSSMRA85T10A56', 'too short'],
      ['1234567890123456', 'wrong format'],
      ['', 'empty string'],
    ])('should reject %s (%s)', (value, description) => {
      expect(checkCF16(value)).toEqual(false);
    });
  });
});
