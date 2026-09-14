import { DateTime } from 'effect';
// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { PeppolInvoicePeriod } from './peppol-invoice-period-schema';

describe('PeppolInvoicePeriod', () => {
  const testSchema = new TestSchema.Asserts(PeppolInvoicePeriod);
  const decode = testSchema.decoding();

  it('should parse an empty invoice period', async () => {
    await decode.succeed({});
  });

  it('should parse an invoice period with a description code', async () => {
    await decode.succeed(
      { startDate: '2017-10-01', endDate: '2017-10-31', descriptionCode: '35' },
      { startDate: DateTime.makeUnsafe('2017-10-01'), endDate: DateTime.makeUnsafe('2017-10-31'), descriptionCode: '35' }
    );
  });

  it('should reject an invalid description code', async () => {
    await decode.fail({ descriptionCode: '99' }, 'Expected "3" | "35" | "432"\n  at ["descriptionCode"]');
  });
});
