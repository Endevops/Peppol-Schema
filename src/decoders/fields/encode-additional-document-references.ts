import type { PeppolAdditionalDocumentReference } from '#/schemas/fields/additional-document-reference-schema';

import { encodeIdentifier } from '#/decoders/fields/encode-identifier';

export function encodeAdditionalDocumentReferences(refs: Array<PeppolAdditionalDocumentReference> | undefined) {
  return refs?.map(ref => ({
    'cbc:ID': encodeIdentifier(ref.id),
    'cbc:DocumentTypeCode': ref.documentTypeCode,
    'cbc:DocumentDescription': ref.documentDescription,
    'cac:Attachment': encodeAttachment(ref.attachment),
  }));
}

function encodeAttachment(attachment: PeppolAdditionalDocumentReference['attachment'] | undefined) {
  if (!attachment) return undefined;
  return {
    'cac:ExternalReference': attachment.externalReference ? { 'cbc:URI': attachment.externalReference.uri } : undefined,
    'cbc:EmbeddedDocumentBinaryObject': attachment.embeddedDocumentBinaryObject
      ? {
          '#text': attachment.embeddedDocumentBinaryObject.content,
          '@filename': attachment.embeddedDocumentBinaryObject.filename,
          '@mimeCode': attachment.embeddedDocumentBinaryObject.mimeCode,
        }
      : undefined,
  };
}
