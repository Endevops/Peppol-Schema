import { describe, expect, it } from 'vitest';
import { isValidGLN } from './is-valid-gln';

describe(`${isValidGLN.name}()`, () => {
  it.each([['7495563456235'], ['13377923938760'], ['7300010000001'], ['9482348239847239874']])('should validate correct GLNs %s', value => {
    expect(isValidGLN(value)).toEqual({ success: true });
  });

  it.each([['1234567890123']])('should reject invalid GLNs %s', value => {
    expect(isValidGLN(value)).toEqual({ actual: 3, expected: 8, success: false });
  });
});
