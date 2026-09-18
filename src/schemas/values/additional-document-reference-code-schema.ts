import { Schema } from 'effect';

import { additionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated';

/**
 * @description An additional document reference code from the PEPPOL subset of UNCL 1153 (invoiced object identifier scheme).
 *
 * @example
 *   ```ts
 *   'AAA';
 *   ```;
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1153/
 * @see {@link additionalDocumentReferenceCodesKeys}
 */
export const PeppolAdditionalDocumentReferenceCode = Schema.Literals(additionalDocumentReferenceCodesKeys).pipe(
  Schema.brand('PeppolAdditionalDocumentReferenceCode'),
  Schema.toStandardSchemaV1
);

/**
 * @description Decoded form of {@link PeppolAdditionalDocumentReferenceCode}.
 */
export type PeppolAdditionalDocumentReferenceCode = Schema.Schema.Type<typeof PeppolAdditionalDocumentReferenceCode>;
