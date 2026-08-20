import * as z from 'zod/mini';

import type { additionalDocumentReferenceCodesKey } from '#/values/additional-document-reference-codes.generated';

import { additionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated';

export type AdditionalDocumentReferenceCode = additionalDocumentReferenceCodesKey;

export function additionalDocumentReferenceCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => additionalDocumentReferenceCodesKeys.includes(val as AdditionalDocumentReferenceCode), error));
}
