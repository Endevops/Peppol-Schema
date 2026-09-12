// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolInvoicePeriodSchema } from './peppol-invoice-period-schema';

describe('peppolInvoicePeriodSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolInvoicePeriodSchema);
  const decode = testSchema.decoding();

  it('should parse an empty invoice period', async () => {
    await decode.succeed({});
  });

  it('should parse an invoice period with a description code', async () => {
    await decode.succeed({ startDate: '2017-10-01', endDate: '2017-10-31', descriptionCode: '35' });
  });

  it('should reject an invalid description code', async () => {
    await decode.fail({ descriptionCode: '99' }, 'Expected "3" | "35" | "432"\n  at ["descriptionCode"]');
  });
});
