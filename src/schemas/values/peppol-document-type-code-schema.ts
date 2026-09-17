import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { documentTypeCodesKeys } from '#/values/document-type-codes.generated';

/**
 * @description A document type code from the PEPPOL subset of UNCL 1001.
 *
 * @example
 *   ```ts
 *   '1';
 *   ```;
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001/
 * @see {@link documentTypeCodesKeys}
 */
export class PeppolDocumentTypeCode extends opaque<PeppolDocumentTypeCode>()(
  Schema.Literals(documentTypeCodesKeys).pipe(Schema.brand('PeppolDocumentTypeCode'))
) {}
