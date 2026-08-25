import * as z from 'zod/mini';

import type { AdditionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated';

import { additionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated';

/**
 * @description Additional document reference.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1153/
 * @see {@link additionalDocumentReferenceCodesKeys}
 */
export type PeppolAdditionalDocumentReference = AdditionalDocumentReferenceCodesKeys;

export function additionalDocumentReferenceCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => additionalDocumentReferenceCodesKeys.includes(val), error));
}
