import { Schema } from 'effect';

import type { AdditionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated';

import { additionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated';

/**
 * @description Additional document reference.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1153/
 * @see {@link additionalDocumentReferenceCodesKeys}
 */
export type PeppolAdditionalDocumentReferenceCode = AdditionalDocumentReferenceCodesKeys;

/**
 * @description Validates an additional document reference code against the PEPPOL subset of UNCL 1153 (reference qualifiers).
 *
 * @param error - The custom error message to use when validation fails. Defaults to the generic message.
 *
 * @returns An Effect schema that accepts only valid additional document reference codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1153/
 * @see {@link additionalDocumentReferenceCodesKeys}
 */
export function additionalDocumentReferenceCodeSchema(error?: string) {
  const schema = Schema.Literals(additionalDocumentReferenceCodesKeys);
  return error === undefined ? schema : schema.annotate({ message: error });
}
