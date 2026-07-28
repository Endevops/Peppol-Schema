import { describe, expect, it } from 'vitest';
import { isValidMod97_0208 } from './is-valid-mod97-0208';

describe('isValidMod97_0208', () => {
  it.each([
    ['0208158634', 'standard format'],
    ['0417199869', 'alternative format'],
  ])('should validate %s (%s)', value => {
    expect(isValidMod97_0208(value)).toEqual({ success: true });
  });

  it.each([
    ['0208158641', 'wrong check digit', { actual: 41, expected: 34 }],
    ['020815864', 'too short', { actual: 4, expected: 34 }],
    ['020815864a', 'non-numeric character', { actual: NaN, expected: 34 }],
    ['', 'empty string', { actual: 0, expected: 97 }],
  ])('should reject %s (%s)', (value, _, expected) => {
    expect(isValidMod97_0208(value)).toEqual({ success: false, ...expected });
  });
});
