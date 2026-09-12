// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolAdditionalDocumentReferenceSchema } from './peppol-additional-document-reference-schema';

describe('peppolAdditionalDocumentReferenceSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolAdditionalDocumentReferenceSchema);
  const decode = testSchema.decoding();

  it('should parse a minimal additional document reference', async () => {
    await decode.succeed({ id: { id: 'doc-1' } });
  });

  it('should parse a reference with scheme, type code and attachment', async () => {
    await decode.succeed({
      id: { id: 'doc-1', schemeId: 'AAA' },
      documentTypeCode: '130',
      documentDescription: 'Supporting document',
      attachment: {
        embeddedDocumentBinaryObject: { content: 'aGVsbG8=', mimeCode: 'text/csv', filename: 'test.csv' },
        externalReference: { uri: 'http://www.example.com/index.html' },
      },
    });
  });

  it('should reject a reference without an id', async () => {
    await decode.fail({}, 'Missing key\n  at ["id"]');
  });

  it('should reject a reference whose id is missing', async () => {
    await decode.fail({ id: {} }, 'Missing key\n  at ["id"]["id"]');
  });
});
