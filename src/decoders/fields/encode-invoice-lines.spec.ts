import { describe, it, expect } from 'vitest';

import { encodeInvoiceLines } from './encode-invoice-lines';

const invoiceLine = {
  id: '1',
  note: 'note',
  invoicedQuantity: { value: 2, unitCode: 'C62' },
  lineExtensionAmount: { value: 10, currencyId: 'EUR' },
  accountingCost: 'AC',
  item: {
    description: 'desc',
    name: 'Item',
    buyersItemIdentification: { id: 'b1' },
    sellersItemIdentification: { id: 's1' },
    classifiedTaxCategory: { id: 'S', percent: '20', taxSchemeId: { id: 'VAT' } },
  },
  price: { priceAmount: { value: 5, currencyId: 'EUR' } },
};

describe('encodeInvoiceLines', () => {
  it('returns undefined for an empty array', () => {
    // ❌ Negative: empty invoice lines array → undefined.
    expect(encodeInvoiceLines([])).toBeUndefined();
  });

  it('maps each line of a non-empty array', () => {
    // ✅ Positive: a present line is encoded through the shared line encoder.
    const result = encodeInvoiceLines([invoiceLine] as any);
    expect(result).toHaveLength(1);
    expect(result?.[0]?.['cbc:ID']).toBe('1');
    expect(result?.[0]?.['cbc:InvoicedQuantity']).toEqual({ '#text': 2, '@unitCode': 'C62' });
  });
});
