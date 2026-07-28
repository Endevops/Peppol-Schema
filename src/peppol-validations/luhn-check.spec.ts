import { describe, expect, it } from 'vitest';
import { luhnCheck } from './luhn-check';

describe('luhnCheck', () => {
  describe('valid credit card numbers', () => {
    it.each([
      ['4532015112830366', 'valid Visa'],
      ['5555555555554444', 'valid MasterCard'],
    ])('should validate %s (%s)', value => {
      expect(luhnCheck(value)).toEqual(true);
    });
  });

  describe('invalid inputs', () => {
    it.each([
      ['4532015112830367', 'wrong check digit'],
      ['453201511283036a', 'non-numeric character'],
      ['', 'empty string'],
    ])('should reject %s (%s)', value => {
      expect(luhnCheck(value)).toEqual(false);
    });
  });
});
