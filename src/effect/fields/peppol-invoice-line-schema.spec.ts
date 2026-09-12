// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolInvoiceLineSchema } from './peppol-invoice-line-schema';

const validInvoiceLine = {
  id: '1',
  invoicedQuantity: { value: 100, unitCode: 'C62' },
  lineExtensionAmount: { currencyId: 'EUR', value: 3800 },
  item: { name: 'Widget', classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } } },
  price: { priceAmount: { currencyId: 'EUR', value: 38 } },
};

describe('peppolInvoiceLineSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolInvoiceLineSchema);
  const decode = testSchema.decoding();

  it('should parse an invoice line', async () => {
    await decode.succeed(validInvoiceLine);
  });

  it('should reject an invoice line without an invoiced quantity', async () => {
    const { invoicedQuantity: _qty, ...noQty } = validInvoiceLine;
    await decode.fail(noQty, 'Missing key\n  at ["invoicedQuantity"]');
  });

  it('should reject an invoiced quantity without a unit code', async () => {
    await decode.fail({ ...validInvoiceLine, invoicedQuantity: { value: 100 } }, 'Missing key\n  at ["invoicedQuantity"]["unitCode"]');
  });

  it('should reject an invoiced quantity without a value', async () => {
    await decode.fail({ ...validInvoiceLine, invoicedQuantity: { unitCode: 'C62' } }, 'Missing key\n  at ["invoicedQuantity"]["value"]');
  });
});
