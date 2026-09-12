// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolBinaryObjectSchema } from './peppol-binary-object-schema';

describe('peppolBinaryObjectSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolBinaryObjectSchema);
  const decode = testSchema.decoding();

  it('should parse a binary object with standard base64 content', async () => {
    await decode.succeed({ content: 'aGVsbG8=', mimeCode: 'text/csv', filename: 'test.csv' });
  });

  it('should parse a binary object with base64url content', async () => {
    await decode.succeed({ content: 'aGVsbG8td29ybGQ_', mimeCode: 'application/pdf', filename: 'test.pdf' });
  });

  it('should reject a binary object without a mime code', async () => {
    await decode.fail({ content: 'aGVsbG8=', filename: 'test.csv' }, 'Missing key\n  at ["mimeCode"]');
  });

  it('should reject a binary object without a filename', async () => {
    await decode.fail({ content: 'aGVsbG8=', mimeCode: 'text/csv' }, 'Missing key\n  at ["filename"]');
  });

  it('should reject invalid base64 content', async () => {
    await decode.fail(
      { content: 'not base64!!', mimeCode: 'text/csv', filename: 'test.csv' },
      'Invalid base64\n  at ["content"]\nInvalid base64url\n  at ["content"]'
    );
  });
});
