import { describe, expect, it } from 'vitest';
import { checkSEOrgnr } from './check-se-orgnr';

describe('checkSEOrgnr', () => {
  it.each([['5560360793']] as const)('should validate %s as a correct Swedish organization numbers', value => {
    expect(checkSEOrgnr(value)).toEqual(true); // Valid Swedish org number
  });

  describe('invalid Swedish org numbers', () => {
    it.each([
      ['5560360792', 'wrong check digit'],
      ['556036079', 'wrong length'],
      ['556036079a', 'non-numeric character'],
      ['', 'empty string'],
    ])('should reject %s (%s)', value => {
      expect(checkSEOrgnr(value)).toEqual(false);
    });
  });
});
