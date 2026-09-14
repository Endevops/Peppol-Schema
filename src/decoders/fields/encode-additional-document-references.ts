import { Effect, Predicate } from 'effect';

import type { PeppolAdditionalDocumentReference } from '#/schemas/fields/peppol-additional-document-reference-schema.ts';

import { encodeIdentifier } from '#/decoders/fields/encode-identifier.ts';

export const encodeAdditionalDocumentReferences = Effect.fn(function* (refs: ReadonlyArray<PeppolAdditionalDocumentReference> | undefined) {
  if (Predicate.isNullish(refs)) return undefined;

  return yield* Effect.forEach(
    refs,
    Effect.fn(function* (ref: PeppolAdditionalDocumentReference) {
      return {
        'cbc:ID': yield* encodeIdentifier(ref.id),
        'cbc:DocumentTypeCode': ref.documentTypeCode,
        'cbc:DocumentDescription': ref.documentDescription,
        'cac:Attachment': yield* encodeAttachment(ref.attachment),
      };
    })
  );
});

const encodeAttachment = Effect.fn(function* (attachment: PeppolAdditionalDocumentReference['attachment'] | undefined) {
  if (Predicate.isNullish(attachment)) return undefined;
  return {
    'cac:ExternalReference': Predicate.isNotNullish(attachment.externalReference) ? { 'cbc:URI': attachment.externalReference.uri } : undefined,
    'cbc:EmbeddedDocumentBinaryObject': Predicate.isNotNullish(attachment.embeddedDocumentBinaryObject)
      ? {
          '#text': attachment.embeddedDocumentBinaryObject.content,
          '@filename': attachment.embeddedDocumentBinaryObject.filename,
          '@mimeCode': attachment.embeddedDocumentBinaryObject.mimeCode,
        }
      : undefined,
  };
});
