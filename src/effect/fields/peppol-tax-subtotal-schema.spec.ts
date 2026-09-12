// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolTaxSubtotalSchema } from './peppol-tax-subtotal-schema';

const validTaxSubtotal = {
  taxAmount: { currencyId: 'EUR', value: 20 },
  taxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } },
  taxableAmount: { currencyId: 'EUR', value: 100 },
};

describe('peppolTaxSubtotalSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolTaxSubtotalSchema);
  const decode = testSchema.decoding();

  it('should parse a tax subtotal', async () => {
    await decode.succeed(validTaxSubtotal);
  });

  it('should reject a missing taxAmount', async () => {
    await decode.fail(
      { taxCategory: validTaxSubtotal.taxCategory, taxableAmount: validTaxSubtotal.taxableAmount },
      'Missing key\n  at ["taxAmount"]'
    );
  });

  it('should reject a missing taxableAmount', async () => {
    await decode.fail({ taxAmount: validTaxSubtotal.taxAmount, taxCategory: { id: 'S', taxSchemeId: {} } }, 'Missing key\n  at ["taxableAmount"]');
  });

  it('should reject a missing taxCategory', async () => {
    await decode.fail({ taxAmount: validTaxSubtotal.taxAmount, taxableAmount: validTaxSubtotal.taxableAmount }, 'Missing key\n  at ["taxCategory"]');
  });
});
