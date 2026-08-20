import { describe, expect, it } from 'vitest';

import { isValidGLN } from './is-valid-gln';

describe('isValidGLN', () => {
  it.each([
    ['9501101530003', 'GS1 sample'],
    ['6291041500213', 'sample'],
    ['1210000590879', 'sample'],
  ])('should accept %s (%s)', value => {
    expect(isValidGLN(value)).toEqual({ success: true });
  });

  it('normalizes whitespace before validating', () => {
    expect(isValidGLN('950 1101 5300 03')).toEqual({ success: true });
  });

  it.each([
    ['9501101530004', 'wrong check digit', { actual: 4, expected: 3 }],
    ['950110153000', 'too short', { actual: 0, expected: 7 }],
    ['', 'empty string', { actual: NaN, expected: 0 }],
  ])('should reject %s (%s)', (value, _, expected) => {
    expect(isValidGLN(value)).toEqual({ success: false, ...expected });
  });

  it('should reject a non-numeric value', () => {
    expect(isValidGLN('abc').success).toBe(false);
  });

  it('should treat an undefined value as an empty string', () => {
    // The `val ?? ''` fallback
    expect(isValidGLN(undefined as unknown as string)).toEqual({ success: false, actual: NaN, expected: 0 });
  });
});
