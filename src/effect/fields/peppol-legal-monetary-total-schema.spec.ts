// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolLegalMonetaryTotalSchema } from './peppol-legal-monetary-total-schema';

const amount = (value: number) => ({ currencyId: 'EUR', value });

const validTotal = {
  lineExtensionAmount: amount(3800),
  taxExclusiveAmount: amount(3600),
  taxInclusiveAmount: amount(4500),
  payableAmount: amount(4500),
};

describe('peppolLegalMonetaryTotalSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolLegalMonetaryTotalSchema);
  const decode = testSchema.decoding();

  it('should parse a minimal legal monetary total', async () => {
    await decode.succeed(validTotal);
  });

  it('should parse a legal monetary total with optional amounts', async () => {
    await decode.succeed({
      ...validTotal,
      allowanceTotalAmount: amount(200),
      chargeTotalAmount: amount(0),
      payableRoundingAmount: amount(0),
      prepaidAmount: amount(0),
    });
  });

  it('should reject a total without a payable amount', async () => {
    const { payableAmount: _payable, ...noPayable } = validTotal;
    await decode.fail(noPayable, 'Missing key\n  at ["payableAmount"]');
  });

  it('should reject a total without a tax inclusive amount', async () => {
    const { taxInclusiveAmount: _inclusive, ...noInclusive } = validTotal;
    await decode.fail(noInclusive, 'Missing key\n  at ["taxInclusiveAmount"]');
  });

  it('should reject a total without a line extension amount', async () => {
    const { lineExtensionAmount: _line, ...noLine } = validTotal;
    await decode.fail(noLine, 'Missing key\n  at ["lineExtensionAmount"]');
  });
});
