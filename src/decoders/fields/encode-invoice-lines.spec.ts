import { describe, it, expect } from 'vitest';

import { encodeInvoiceLines } from './encode-invoice-lines';

const invoiceLine = {
  accountingCost: 'AC',
  id: '1',
  invoicedQuantity: { unitCode: 'C62', value: 2 },
  item: {
    buyersItemIdentification: { id: 'b1' },
    classifiedTaxCategory: { id: 'S', percent: '20', taxSchemeId: { id: 'VAT' } },
    description: 'desc',
    name: 'Item',
    sellersItemIdentification: { id: 's1' },
  },
  lineExtensionAmount: { currencyId: 'EUR', value: 10 },
  note: 'note',
  price: { priceAmount: { currencyId: 'EUR', value: 5 } },
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
