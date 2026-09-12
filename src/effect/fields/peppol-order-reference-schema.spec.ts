// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolOrderReferenceSchema } from './peppol-order-reference-schema';

describe('peppolOrderReferenceSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolOrderReferenceSchema);
  const decode = testSchema.decoding();

  it('should parse a purchase order reference', async () => {
    await decode.succeed({ id: '98776' });
  });

  it('should parse with an optional salesOrderId', async () => {
    await decode.succeed({ id: '98776', salesOrderId: '112233' });
  });

  it('should reject a missing id', async () => {
    await decode.fail({ salesOrderId: '112233' }, 'Missing key\n  at ["id"]');
  });
});
