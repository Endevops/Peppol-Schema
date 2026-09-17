import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
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
export class PeppolAdditionalDocumentReferenceCode extends opaque<PeppolAdditionalDocumentReferenceCode>()(
  Schema.Literals(additionalDocumentReferenceCodesKeys).pipe(Schema.brand('PeppolAdditionalDocumentReferenceCode'), Schema.toStandardSchemaV1)
) {}
