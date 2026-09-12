// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolPaymentTermsSchema } from './peppol-payment-terms-schema';

describe('peppolPaymentTermsSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolPaymentTermsSchema);
  const decode = testSchema.decoding();

  it('should parse payment terms', async () => {
    await decode.succeed({ note: 'Net within 30 days' });
  });

  it('should reject missing payment terms', async () => {
    await decode.fail({}, 'Missing key\n  at ["note"]');
  });
});
