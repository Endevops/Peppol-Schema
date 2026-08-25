import { describe, expect, it } from 'vitest';

import { invoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

import { getInvoiceTypeCodeDescription } from './get-invoice-type-code-description';

describe('getInvoiceTypeCodeDescription', () => {
  it.each(invoiceTypeCodesKeys)('returns the description for a valid invoice type code (%s)', code => {
    expect(getInvoiceTypeCodeDescription(code as never)).toBeTruthy();
  });
});
