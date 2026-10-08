// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vite-plus/test';

import { PeppolAllowanceCharge } from './peppol-allowance-charge-schema.ts';

describe('PeppolAllowanceCharge', () => {
  const testSchema = new TestSchema.Asserts(PeppolAllowanceCharge);
  const decode = testSchema.decoding();

  it('should parse a document level allowance', async () => {
    await decode.succeed({ amount: { currencyId: 'EUR', value: 100 }, chargeIndicator: false, taxCategory: { id: 'S', taxSchemeId: { id: 'VAT' } } });
  });

  it('should parse a document level charge', async () => {
    await decode.succeed({ amount: { currencyId: 'EUR', value: 5 }, chargeIndicator: true });
  });

  it('should parse an allowance with reason and tax category', async () => {
    await decode.succeed({
      allowanceChargeReason: 'Bonus',
      allowanceChargeReasonCode: '41',
      amount: { currencyId: 'EUR', value: 100 },
      chargeIndicator: false,
      taxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } },
    });
  });

  it('should parse an allowance charge without a charge indicator as a charge', async () => {
    await decode.succeed({ amount: { currencyId: 'EUR', value: 100 } });
  });

  it('should reject an allowance charge without an amount', async () => {
    await decode.fail({ chargeIndicator: false }, 'Missing key\n  at ["amount"]\nExpected true | undefined\n  at ["chargeIndicator"]');
  });
});
