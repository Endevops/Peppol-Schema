// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolBaseLineSchema } from './peppol-base-line-schema';

const validBaseLine = {
  id: '1',
  lineExtensionAmount: { currencyId: 'EUR', value: 100 },
  item: { name: 'Widget', classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } } },
  price: { priceAmount: { currencyId: 'EUR', value: 50 } },
};

describe('peppolBaseLineSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolBaseLineSchema);
  const decode = testSchema.decoding();

  it('should parse a minimal base line', async () => {
    await decode.succeed(validBaseLine);
  });

  it('should parse a base line with optional fields', async () => {
    await decode.succeed({
      ...validBaseLine,
      accountingCost: '1287:65464',
      note: 'New article number 12345',
      orderLineReference: { lineId: '1' },
      invoicePeriod: { startDate: '2024-01-01', endDate: '2024-01-31' },
      documentReference: [{ id: 'ref-1', documentTypeCode: '130' }],
    });
  });

  it('should reject a base line without an id', async () => {
    const { id: _id, ...noId } = validBaseLine;
    await decode.fail(noId, 'Missing key\n  at ["id"]');
  });

  it('should reject a base line without an item', async () => {
    const { item: _item, ...noItem } = validBaseLine;
    await decode.fail(noItem, 'Missing key\n  at ["item"]');
  });

  it('should reject a base line without a line extension amount', async () => {
    const { lineExtensionAmount: _amount, ...noAmount } = validBaseLine;
    await decode.fail(noAmount, 'Missing key\n  at ["lineExtensionAmount"]');
  });

  it('should reject a base line without a price', async () => {
    const { price: _price, ...noPrice } = validBaseLine;
    await decode.fail(noPrice, 'Missing key\n  at ["price"]');
  });
});
