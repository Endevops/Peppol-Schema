import { describe, expect, it } from 'vitest';

import { isValidMod11 } from './is-valid-mod11';

describe('isValidMod11', () => {
  it('should validate Norwegian organization numbers', () => {
    expect(isValidMod11('987654325')).toEqual(true); // Valid Norwegian org number
  });

  describe('invalid inputs', () => {
    it.each([
      ['987654324', 'wrong check digit'],
      ['12345678a', 'non-numeric character'],
      ['1', 'too short'],
      ['', 'empty string'],
    ])('should reject %s (%s)', value => {
      expect(isValidMod11(value)).toEqual(false);
    });
  });
});
