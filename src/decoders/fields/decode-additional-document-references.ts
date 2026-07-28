import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolAdditionalDocumentReference } from '#/schemas/fields/additional-document-reference-schema';
import type { RecursivePartial } from '#/types';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { getArray } from '#/helpers/get-array';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

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
