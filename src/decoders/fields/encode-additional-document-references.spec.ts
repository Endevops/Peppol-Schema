import { Effect } from 'effect';
import { describe, it, expect } from 'vitest';

import { encodeAdditionalDocumentReferences } from './encode-additional-document-references';

const embedded = { content: 'aGVsbG8=', mimeCode: 'text/plain', filename: 'notes.txt' };

describe('encodeAdditionalDocumentReferences', () => {
  it('returns undefined when the references array is undefined', () => {
    // ❌ Negative: undefined array → undefined.
    expect(Effect.runSync(encodeAdditionalDocumentReferences(undefined))).toBeUndefined();
  });

  it('returns a ref with no attachment when attachment is absent', () => {
    // ❌ Negative: attachment undefined → no cac:Attachment.
    expect(Effect.runSync(encodeAdditionalDocumentReferences([{ id: { id: 'R1' } }]))?.[0]?.['cac:Attachment']).toBeUndefined();
  });

  it('encodes an attachment with both external reference and embedded binary object', () => {
    // ✅ Positive: both externalReference and embeddedDocumentBinaryObject branches.
    expect(
      Effect.runSync(
        encodeAdditionalDocumentReferences([
          { id: { id: 'R1' }, attachment: { externalReference: { uri: 'http://example.com/doc' }, embeddedDocumentBinaryObject: embedded } },
        ])
      )?.[0]?.['cac:Attachment']
    ).toEqual({
      'cac:ExternalReference': { 'cbc:URI': 'http://example.com/doc' },
      'cbc:EmbeddedDocumentBinaryObject': { '#text': 'aGVsbG8=', '@filename': 'notes.txt', '@mimeCode': 'text/plain' },
    });
  });

  it('encodes an attachment with only an embedded binary object', () => {
    // ❌ Negative: embedded present but externalReference absent.
    expect(
      Effect.runSync(encodeAdditionalDocumentReferences([{ id: { id: 'R1' }, attachment: { embeddedDocumentBinaryObject: embedded } }]))?.[0]?.[
        'cac:Attachment'
      ]
    ).toEqual({
      'cac:ExternalReference': undefined,
      'cbc:EmbeddedDocumentBinaryObject': { '#text': 'aGVsbG8=', '@filename': 'notes.txt', '@mimeCode': 'text/plain' },
    });
  });

  it('encodes an attachment with only an external reference', () => {
    // ❌ Negative: externalReference present but embedded binary object absent.
    expect(
      Effect.runSync(
        encodeAdditionalDocumentReferences([{ id: { id: 'R1' }, attachment: { externalReference: { uri: 'http://example.com/doc' } } }])
      )?.[0]?.['cac:Attachment']
    ).toEqual({ 'cac:ExternalReference': { 'cbc:URI': 'http://example.com/doc' }, 'cbc:EmbeddedDocumentBinaryObject': undefined });
  });
});
