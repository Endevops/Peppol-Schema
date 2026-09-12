// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolInvoiceLinePeriodSchema } from './peppol-invoice-line-period-schema';

describe('peppolInvoiceLinePeriodSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolInvoiceLinePeriodSchema);
  const decode = testSchema.decoding();

  it('should parse an empty invoice line period', async () => {
    await decode.succeed({});
  });

  it('should parse an invoice line period with dates', async () => {
    await decode.succeed({ startDate: '2017-10-01', endDate: '2017-10-31' });
  });

  it('should reject an invalid start date', async () => {
    await decode.fail({ startDate: '2017/10/01' }, 'Expected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}$\n  at ["startDate"]');
  });
});
