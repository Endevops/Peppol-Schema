import { describe, expect, it } from 'vitest';
import { addPIVA } from './add-piva';

describe('addPIVA', () => {
  it.each([['01234567889', 0, 50]] as const)('should calculate weighted sum for PIVA validation', (arg, pari, expected) => {
    expect(addPIVA(arg, pari)).toEqual(expected);
  });

  it('should return 0 for non-numeric input', () => {
    expect(addPIVA('123a567890', 0)).toEqual(0);
  });
});
