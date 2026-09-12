import { describe, expect, it } from 'vitest';

import { isValidInvoiceTypeCode } from '#/effect/utils/is-valid-invoice-type-code';
import { invoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

describe('isValidInvoiceTypeCode', () => {
  it.each(invoiceTypeCodesKeys)('returns true for a valid invoice type code (%s)', code => {
    expect(isValidInvoiceTypeCode(code)).toBe(true);
  });

  it('returns false for an unknown code', () => {
    expect(isValidInvoiceTypeCode('999')).toBe(false);
  });
});
