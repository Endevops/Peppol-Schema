// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolCreditNoteLineSchema } from './peppol-credit-note-line-schema';

const validCreditNoteLine = {
  id: '1',
  creditedQuantity: { value: 2, unitCode: 'C62' },
  lineExtensionAmount: { currencyId: 'EUR', value: 100 },
  item: { name: 'Widget', classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } } },
  price: { priceAmount: { currencyId: 'EUR', value: 50 } },
};

describe('peppolCreditNoteLineSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolCreditNoteLineSchema);
  const decode = testSchema.decoding();

  it('should parse a credit note line', async () => {
    await decode.succeed(validCreditNoteLine);
  });

  it('should reject a credit note line without a credited quantity', async () => {
    const { creditedQuantity: _qty, ...noQty } = validCreditNoteLine;
    await decode.fail(noQty, 'Missing key\n  at ["creditedQuantity"]');
  });

  it('should reject a credited quantity without a unit code', async () => {
    await decode.fail({ ...validCreditNoteLine, creditedQuantity: { value: 2 } }, 'Missing key\n  at ["creditedQuantity"]["unitCode"]');
  });

  it('should reject a credited quantity without a value', async () => {
    await decode.fail({ ...validCreditNoteLine, creditedQuantity: { unitCode: 'C62' } }, 'Missing key\n  at ["creditedQuantity"]["value"]');
  });
});
