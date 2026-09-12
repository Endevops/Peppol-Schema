// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolLineAllowanceChargeSchema } from './peppol-line-allowance-charge-schema';

describe('peppolLineAllowanceChargeSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolLineAllowanceChargeSchema);
  const decode = testSchema.decoding();

  it('should parse a line allowance', async () => {
    await decode.succeed({ amount: { currencyId: 'EUR', value: 20 }, chargeIndicator: false });
  });

  it('should parse a line charge', async () => {
    await decode.succeed({ amount: { currencyId: 'EUR', value: 10 }, chargeIndicator: true });
  });

  it('should parse a line allowance with reason and multiplier', async () => {
    await decode.succeed({
      allowanceChargeReason: 'Discount',
      allowanceChargeReasonCode: '41',
      amount: { currencyId: 'EUR', value: 20 },
      chargeIndicator: false,
      multiplierFactorNumeric: 20,
    });
  });

  it('should reject a line allowance charge without a charge indicator', async () => {
    await decode.fail({ amount: { currencyId: 'EUR', value: 20 } }, 'unable to decode line allowance charge');
  });

  it('should reject a line allowance charge without an amount', async () => {
    await decode.fail({ chargeIndicator: false }, 'Missing key\n  at ["amount"]');
  });
});
