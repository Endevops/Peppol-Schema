import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolAdditionalDocumentReference } from '#/schemas/fields/additional-document-reference-schema';
import type { RecursivePartial } from '#/types';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { getArray } from '#/helpers/get-array';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeAdditionalDocumentReferences = Effect.fn(function* (
  doc: XmlNode
): Effect.fn.Return<Array<RecursivePartial<PeppolAdditionalDocumentReference>> | undefined> {
  const arr = yield* getArray(doc, 'cac:AdditionalDocumentReference');
  if (arr.length === 0) {
    return undefined;
  }

  return yield* Effect.forEach(
    arr,
    Effect.fn(function* (additionalDocumentReference: XmlNode) {
      const attachment = yield* getProp(additionalDocumentReference, 'cac:Attachment');
      const embeddedDocumentBinaryObject = yield* getProp(attachment, 'cbc:EmbeddedDocumentBinaryObject');
      const externalReference = yield* getProp(attachment, 'cac:ExternalReference');
      return {
        attachment: Predicate.isNotNullish(attachment)
          ? {
              embeddedDocumentBinaryObject: Predicate.isNotNullish(embeddedDocumentBinaryObject)
                ? {
                    content: yield* strOrUnd(embeddedDocumentBinaryObject),
                    filename: yield* strOrUnd(embeddedDocumentBinaryObject, '@filename'),
                    mimeCode: yield* strOrUnd(embeddedDocumentBinaryObject, '@mimeCode'),
                  }
                : undefined,
              externalReference: Predicate.isNotNullish(externalReference) ? { uri: yield* strOrUnd(externalReference, 'cbc:URI') } : undefined,
            }
          : undefined,
        documentDescription: yield* strOrUnd(additionalDocumentReference, 'cbc:DocumentDescription'),
        documentTypeCode: yield* strOrUnd(additionalDocumentReference, 'cbc:DocumentTypeCode'),
        id: yield* decodeIdentifier(additionalDocumentReference, 'cbc:ID'),
      };
    })
  );
});
