import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { additionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated';

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
export class PeppolAdditionalDocumentReferenceCode extends opaque<PeppolAdditionalDocumentReferenceCode>()(
  Schema.Literals(additionalDocumentReferenceCodesKeys).pipe(Schema.brand('PeppolAdditionalDocumentReferenceCode'))
) {}
