// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolLinePriceAllowanceChargeSchema } from './peppol-line-price-allowance-charge-schema';

const validAllowanceCharge = { amount: { currencyId: 'EUR', value: 200 }, chargeIndicator: false };

describe('peppolLinePriceAllowanceChargeSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolLinePriceAllowanceChargeSchema);
  const decode = testSchema.decoding();

  it('should parse a valid price allowance charge', async () => {
    await decode.succeed(validAllowanceCharge);
  });

  it('should parse with an optional baseAmount', async () => {
    await decode.succeed({ ...validAllowanceCharge, baseAmount: { currencyId: 'EUR', value: 1000 } });
  });

  it('should reject chargeIndicator true', async () => {
    await decode.fail(
      { ...validAllowanceCharge, chargeIndicator: true },
      'PEPPOL-EN16931-R044: Charge on price level is NOT allowed. Only value \'false\' allowed.\n  at ["chargeIndicator"]'
    );
  });

  it('should reject a missing chargeIndicator', async () => {
    await decode.fail({ amount: { currencyId: 'EUR', value: 200 } }, 'Missing key\n  at ["chargeIndicator"]');
  });

  it('should reject a missing amount', async () => {
    await decode.fail({ chargeIndicator: false }, 'Missing key\n  at ["amount"]');
  });
});
