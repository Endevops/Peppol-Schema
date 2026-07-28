import { describe, expect, it } from 'vitest';
import { checkPIVAseIT } from './check-piva-se-it';

describe('checkPIVAseIT', () => {
  it.each([['IT01234567889'], ['DE123456789']] as const)('should validate %s as an PIVA', piva => {
    expect(checkPIVAseIT(piva)).toEqual(true);
  });

  it('should reject invalid Italian VAT', () => {
    expect(checkPIVAseIT('IT0123456789')).toEqual(false); // Wrong length
  });
});
