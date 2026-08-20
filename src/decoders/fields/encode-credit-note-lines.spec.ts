import { describe, it, expect } from 'vitest';

import { encodeCreditNoteLines } from './encode-credit-note-lines';

const creditNoteLine = {
  id: '1',
  note: 'note',
  creditedQuantity: { value: 2, unitCode: 'C62' },
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

describe('encodeCreditNoteLines', () => {
  it('returns undefined for an empty array', () => {
    // ❌ Negative: empty credit note lines array → undefined.
    expect(encodeCreditNoteLines([])).toBeUndefined();
  });

  it('maps each line of a non-empty array', () => {
    // ✅ Positive: a present line is encoded through the shared line encoder.
    const result = encodeCreditNoteLines([creditNoteLine]);
    expect(result).toHaveLength(1);
    expect(result?.[0]?.['cbc:ID']).toBe('1');
    expect(result?.[0]?.['cbc:CreditedQuantity']).toEqual({ '#text': 2, '@unitCode': 'C62' });
  });
});
