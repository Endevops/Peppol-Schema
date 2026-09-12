// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { identifierSchema } from './identifier-schema';

describe('identifierSchema', () => {
  const testSchema = new TestSchema.Asserts(identifierSchema());
  const decode = testSchema.decoding();

  it('should parse an identifier with a scheme', async () => {
    await decode.succeed({ id: '1234567890', schemeId: '0088' });
  });

  it('should parse an identifier without a scheme', async () => {
    await decode.succeed({ id: '1234567890' });
  });

  it('should reject an identifier without an id', async () => {
    await decode.fail({ schemeId: '0088' }, 'Missing key\n  at ["id"]');
  });

  it('should reject a non-string id', async () => {
    await decode.fail({ id: 42 }, 'Expected string\n  at ["id"]');
  });

  it('should apply a custom error message', async () => {
    const custom = new TestSchema.Asserts(identifierSchema('custom identifier error'));
    await custom.decoding().fail(null, 'custom identifier error');
  });
});
