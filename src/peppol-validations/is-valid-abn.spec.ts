import { describe, expect, it } from 'vitest';
import { isValidABN } from './is-valid-abn';

describe('isValidABN', () => {
  describe('valid Australian Business Numbers', () => {
    it.each([
      ['51824753556', 'first valid ABN'],
      ['53004085616', 'second valid ABN'],
    ])('should validate %s (%s)', (value, description) => {
      expect(isValidABN(value)).toEqual(true);
    });
  });

  describe('invalid inputs', () => {
    it.each([
      ['51824753557', 'wrong check digit'],
      ['5182475355', 'wrong length'],
      ['5182475355a', 'non-numeric character'],
      ['', 'empty string'],
    ])('should reject %s (%s)', (value, description) => {
      expect(isValidABN(value)).toEqual(false);
    });
  });
});
