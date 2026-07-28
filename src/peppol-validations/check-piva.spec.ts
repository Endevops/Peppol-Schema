import { describe, expect, it } from 'vitest';

import { checkPIVA } from './check-piva';

describe('checkPIVA', () => {
  it.each([['01234567889', 0]] as const)('should validate Italian VAT numbers', (piva, expected) => {
    expect(checkPIVA(piva)).toEqual(expected);
  });

  it('should return 1 for non-numeric input', () => {
    expect(checkPIVA('0123456789a')).toEqual(1);
  });
});
