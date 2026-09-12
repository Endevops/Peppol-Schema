// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolDocumentResponseDocumentReferenceSchema } from './peppol-document-response-document-reference-schema';

describe('peppolDocumentResponseDocumentReferenceSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolDocumentResponseDocumentReferenceSchema);
  const decode = testSchema.decoding();

  it('should decode a document reference with only an id', async () => {
    await decode.succeed({ id: 'EnvelopeID-12456789' });
  });

  it('should decode a document reference with optional type and version', async () => {
    await decode.succeed({ id: 'EnvelopeID-12456789', documentTypeCode: '9', versionId: '2' });
  });

  it('should reject a document reference without required id', async () => {
    await decode.fail({ documentTypeCode: '9' }, 'Missing key\n  at ["id"]');
  });
});
