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

/**
 * @description Validates an additional document reference code against the PEPPOL subset of UNCL 1153 (reference qualifiers).
 *
 * @param error - The custom error message to use when validation fails. Defaults to Zod's generic message.
 *
 * @returns A Zod string schema that accepts only valid additional document reference codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1153/
 * @see {@link additionalDocumentReferenceCodesKeys}
 */
export function additionalDocumentReferenceCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => additionalDocumentReferenceCodesKeys.includes(val), error));
}
