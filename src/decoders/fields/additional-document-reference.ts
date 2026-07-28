import { decodeIdentifier, encodeIdentifier } from '#/decoders/fields/identifier';
import { getArray, getProp, strOrUnd } from '#/helpers';
import type { XmlNode } from '#/helpers';
import type { PeppolAdditionalDocumentReference } from '#/schemas/fields/additional-document-reference-schema';
import type { RecursivePartial } from '#/types';

export function decodeAdditionalDocumentReferences(doc: XmlNode): Array<RecursivePartial<PeppolAdditionalDocumentReference>> | undefined {
  const arr = getArray(doc, 'cac:AdditionalDocumentReference');
  if (arr.length === 0) {
    return undefined;
  }

  return arr.map(additionalDocumentReference => {
    const attachment = getProp(additionalDocumentReference, 'cac:Attachment');
    const embeddedDocumentBinaryObject = getProp(attachment, 'cbc:EmbeddedDocumentBinaryObject');
    const externalReference = getProp(attachment, 'cac:ExternalReference');
    return {
      attachment: attachment
        ? {
            embeddedDocumentBinaryObject: embeddedDocumentBinaryObject
              ? {
                  content: strOrUnd(embeddedDocumentBinaryObject),
                  filename: strOrUnd(embeddedDocumentBinaryObject, '@filename'),
                  mimeCode: strOrUnd(embeddedDocumentBinaryObject, '@mimeCode'),
                }
              : undefined,
            externalReference: externalReference ? { uri: strOrUnd(externalReference, 'cbc:URI') } : undefined,
          }
        : undefined,
      documentDescription: strOrUnd(additionalDocumentReference, 'cbc:DocumentDescription'),
      documentTypeCode: strOrUnd(additionalDocumentReference, 'cbc:DocumentTypeCode'),
      id: decodeIdentifier(additionalDocumentReference, 'cbc:ID'),
    };
  });
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

export function encodeAdditionalDocumentReferences(refs: Array<PeppolAdditionalDocumentReference> | undefined) {
  return refs?.map(ref => ({
    'cbc:ID': encodeIdentifier(ref.id),
    'cbc:DocumentTypeCode': ref.documentTypeCode,
    'cbc:DocumentDescription': ref.documentDescription,
    'cac:Attachment': encodeAttachment(ref.attachment),
  }));
}
