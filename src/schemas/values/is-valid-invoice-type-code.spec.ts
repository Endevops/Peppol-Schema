import { describe, expect, it } from 'vitest';

import { isValidInvoiceTypeCode } from './is-valid-invoice-type-code';

describe('isValidInvoiceTypeCode', () => {
  it('returns true for a valid invoice type code', () => {
    expect(isValidInvoiceTypeCode('71')).toBe(true);
  });

  it('returns false for an unknown code', () => {
    expect(isValidInvoiceTypeCode('999')).toBe(false);
  });
});
