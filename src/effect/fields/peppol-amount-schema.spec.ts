// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolAmountSchema } from './peppol-amount-schema';

describe('peppolAmountSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolAmountSchema);
  const decode = testSchema.decoding();

  it('should parse a monetary amount', async () => {
    await decode.succeed({ currencyId: 'EUR', value: 100.5 });
  });

  it('should reject an amount without a value', async () => {
    await decode.fail({ currencyId: 'EUR' }, 'Missing key\n  at ["value"]');
  });

  it('should reject an amount without a currency id', async () => {
    await decode.fail({ value: 100 }, 'Missing key\n  at ["currencyId"]');
  });

  it('should reject a non-numeric value', async () => {
    await decode.fail({ currencyId: 'EUR', value: '100' }, 'Expected number\n  at ["value"]');
  });
});
