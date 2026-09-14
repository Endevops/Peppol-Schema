import { Schema } from 'effect';

import { additionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated';

/**
 * @description Additional document reference.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1153/
 * @see {@link additionalDocumentReferenceCodesKeys}
 */
export type PeppolAdditionalDocumentReferenceCode = typeof additionalDocumentReferenceCodeSchema.Type;

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
export const additionalDocumentReferenceCodeSchema = Schema.Literals(additionalDocumentReferenceCodesKeys).pipe(
  Schema.brand('PeppolAdditionalDocumentReferenceCode')
);
