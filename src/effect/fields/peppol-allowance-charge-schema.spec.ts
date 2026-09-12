// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolAllowanceChargeSchema } from './peppol-allowance-charge-schema';

describe('peppolAllowanceChargeSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolAllowanceChargeSchema);
  const decode = testSchema.decoding();

  it('should parse a document level allowance', async () => {
    await decode.succeed({ amount: { currencyId: 'EUR', value: 100 }, chargeIndicator: false });
  });

  it('should parse a document level charge', async () => {
    await decode.succeed({ amount: { currencyId: 'EUR', value: 5 }, chargeIndicator: true });
  });

  it('should parse an allowance with reason and tax category', async () => {
    await decode.succeed({
      amount: { currencyId: 'EUR', value: 100 },
      chargeIndicator: false,
      allowanceChargeReasonCode: '41',
      allowanceChargeReason: 'Bonus',
      taxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } },
    });
  });

  it('should reject an allowance charge without a charge indicator', async () => {
    await decode.fail({ amount: { currencyId: 'EUR', value: 100 } }, 'unable to decode allowance charge');
  });

  it('should reject an allowance charge without an amount', async () => {
    await decode.fail({ chargeIndicator: false }, 'Missing key\n  at ["amount"]');
  });
});
