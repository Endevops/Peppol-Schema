import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { vatDateCodesKeys } from '#/values/vat-dates.generated';

/**
 * @description A VAT date code from the PEPPOL subset of UNCL 2005 (invoice period description code).
 *
 * @example
 *   ```ts
 *   '3';
 *   ```;
 *
 * @validations
 * - PEPPOL-EN16931-CL006: Invoice period description code must be according to UNCL 2005 D.16B.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL2005/
 * @see {@link vatDateCodesKeys}
 */
export class PeppolVatDateCode extends opaque<PeppolVatDateCode>()(Schema.Literals(vatDateCodesKeys).pipe(Schema.toStandardSchemaV1)) {}
