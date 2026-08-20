import { describe, expect, it } from 'vitest';

import { getInvoiceTypeCodeDescription } from './get-invoice-type-code-description';

describe('getInvoiceTypeCodeDescription', () => {
  it('returns the description for a valid invoice type code', () => {
    expect(getInvoiceTypeCodeDescription('71' as never)).toBeTruthy();
    expect(getInvoiceTypeCodeDescription('102' as never)).toBeTruthy();
  });
});
