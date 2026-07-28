import { describe, expect, it } from 'vitest';
import { greekTinVerification } from './greek-tin-verification';

describe('greekTinVerification', () => {
  it.each([['123456795'], ['123456783'], ['987654324'], ['123123128']] as const)('should validate %s as a valid Greek TINs', tin => {
    expect(greekTinVerification(tin)).toEqual(true); // Need a valid example
  });

  describe('invalid inputs', () => {
    it.each([
      ['12345678', 'wrong length'],
      ['12345678a', 'non-numeric character'],
      ['', 'empty string'],
    ])('should reject %s (%s)', (value, description) => {
      expect(greekTinVerification(value)).toEqual(false);
    });
  });
});
