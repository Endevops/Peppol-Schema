// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolReferenceSchema } from './peppol-reference-schema';

describe('peppolReferenceSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolReferenceSchema);
  const decode = testSchema.decoding();

  it('should parse a reference struct', async () => {
    await decode.succeed({ id: 'PO-001' });
  });

  it('should parse undefined', async () => {
    await decode.succeed(undefined);
  });

  it('should reject an object without an id', async () => {
    await decode.fail({ foo: 'bar' }, 'Missing key\n  at ["id"]');
  });

  it('should reject a non-string id', async () => {
    await decode.fail({ id: 123 }, 'Expected string\n  at ["id"]');
  });

  it('should reject null', async () => {
    await decode.fail(null, 'Expected object | undefined');
  });
});
