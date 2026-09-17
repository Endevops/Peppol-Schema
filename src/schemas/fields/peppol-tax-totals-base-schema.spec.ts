// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { PeppolTaxTotal } from './peppol-tax-totals-base-schema.ts';

describe('PeppolTaxTotalsBase', () => {
  const testSchema = new TestSchema.Asserts(PeppolTaxTotal);
  const decode = testSchema.decoding();

  it('should parse a tax total without subtotals', async () => {
    await decode.succeed({ taxAmount: { currencyId: 'EUR', value: 20 } });
  });

  it('should parse a tax total with subtotals', async () => {
    await decode.succeed({
      taxAmount: { currencyId: 'EUR', value: 20 },
      taxSubtotals: [
        {
          taxAmount: { currencyId: 'EUR', value: 20 },
          taxCategory: { id: 'S', taxSchemeId: { id: 'VAT' } },
          taxableAmount: { currencyId: 'EUR', value: 100 },
        },
      ],
    });
  });

  it('should reject a missing taxAmount', async () => {
    await decode.fail({}, 'Missing key\n  at ["taxAmount"]');
  });
});
