// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolLinePriceSchema } from './peppol-line-price-schema';

describe('peppolLinePriceSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolLinePriceSchema);
  const decode = testSchema.decoding();

  it('should parse a valid line price', async () => {
    await decode.succeed({ priceAmount: { currencyId: 'EUR', value: 50 } });
  });

  it('should parse with optional baseQuantity and allowanceCharge', async () => {
    await decode.succeed({
      priceAmount: { currencyId: 'EUR', value: 50 },
      baseQuantity: { value: 1, unitCode: 'C62' },
      allowanceCharge: { amount: { currencyId: 'EUR', value: 200 }, chargeIndicator: false },
    });
  });

  it('should reject a missing priceAmount', async () => {
    await decode.fail({ baseQuantity: { value: 1 } }, 'Missing key\n  at ["priceAmount"]');
  });

  it('should reject an allowanceCharge with chargeIndicator true', async () => {
    await decode.fail(
      { priceAmount: { currencyId: 'EUR', value: 50 }, allowanceCharge: { amount: { currencyId: 'EUR', value: 200 }, chargeIndicator: true } },
      'Expected { readonly "chargeIndicator": false, ... } | undefined\n  at ["allowanceCharge"]'
    );
  });

  it('should reject a non-numeric baseQuantity value', async () => {
    await decode.fail(
      { priceAmount: { currencyId: 'EUR', value: 50 }, baseQuantity: { value: 'x' } },
      'Expected number\n  at ["baseQuantity"]["value"]'
    );
  });
});
