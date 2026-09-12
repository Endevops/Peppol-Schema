import { Effect } from 'effect';
import { describe, it, expect } from 'vitest';

import { encodeCreditNoteLines } from './encode-credit-note-lines';

const creditNoteLine = {
  accountingCost: 'AC',
  creditedQuantity: { unitCode: 'C62', value: 2 },
  id: '1',
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

describe('encodeCreditNoteLines', () => {
  it('returns undefined for an empty array', () => {
    // ❌ Negative: empty credit note lines array → undefined.
    expect(Effect.runSync(encodeCreditNoteLines([]))).toBeUndefined();
  });

  it('maps each line of a non-empty array', () => {
    // ✅ Positive: a present line is encoded through the shared line encoder.
    const result = Effect.runSync(encodeCreditNoteLines([creditNoteLine] as any));
    expect(result).toHaveLength(1);
    expect(result?.[0]?.['cbc:ID']).toBe('1');
    expect(result?.[0]?.['cbc:CreditedQuantity']).toEqual({ '#text': 2, '@unitCode': 'C62' });
  });
});
