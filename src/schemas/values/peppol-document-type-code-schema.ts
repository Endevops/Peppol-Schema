import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { documentTypeCodesKeys } from '#/values/document-type-codes.generated';

/**
 * @description Validates a document type code against the PEPPOL subset of UNCL 1001.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid document type codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001/
 */
export class PeppolDocumentTypeCode extends opaque<PeppolDocumentTypeCode>()(
  Schema.Literals(documentTypeCodesKeys).pipe(Schema.brand('PeppolDocumentTypeCode'))
) {}
