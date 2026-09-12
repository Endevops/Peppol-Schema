// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolQuantitySchema } from './peppol-quantity-schema';

describe('peppolQuantitySchema', () => {
  const testSchema = new TestSchema.Asserts(peppolQuantitySchema);
  const decode = testSchema.decoding();

  it('should parse a quantity with a unit code', async () => {
    await decode.succeed({ value: 2, unitCode: 'C62' });
  });

  it('should parse a quantity without a unit code', async () => {
    await decode.succeed({ value: 2 });
  });

  it('should reject a missing value', async () => {
    await decode.fail({ unitCode: 'C62' }, 'Missing key\n  at ["value"]');
  });

  it('should reject a non-numeric value', async () => {
    await decode.fail({ value: 'x' }, 'Expected number\n  at ["value"]');
  });
});
