// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolDocumentResponseDocumentSchema } from './peppol-document-response-document-schema';

describe('peppolDocumentResponseDocumentSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolDocumentResponseDocumentSchema);
  const decode = testSchema.decoding();

  it('should decode a document response with only a response code', async () => {
    await decode.succeed({ responseCode: 'RE' });
  });

  it('should decode a document response with a description', async () => {
    await decode.succeed({ responseCode: 'RE', description: 'Rejected due to validation errors' });
  });

  it('should reject a document response without a response code', async () => {
    await decode.fail({ description: 'Rejected' }, 'Missing key\n  at ["responseCode"]');
  });

  it('should reject a document response with an invalid response code', async () => {
    await decode.fail({ responseCode: 'ZZ' }, 'Expected "AB" | "AP" | "RE"\n  at ["responseCode"]');
  });
});
