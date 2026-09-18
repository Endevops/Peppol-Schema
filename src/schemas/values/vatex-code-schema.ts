import { Schema } from 'effect';

import { vatexCodesKeys } from '#/values/vatex-codes.generated';

/**
 * @description A VAT exemption reason code from the CEF VATEX codelist.
 *
 * @example
 *   ```ts
 *   'VATEX-EU-79-C';
 *   ```;
 *
 * @validations
 * - BR-CL-22: VAT exemption reason code MUST be a valid CEF VATEX code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/vatex/
 * @see {@link vatexCodesKeys}
 */
export const PeppolVatexCode = Schema.Literals(vatexCodesKeys).pipe(Schema.brand('PeppolVatexCode'), Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolVatexCode}.
 */
export type PeppolVatexCode = Schema.Schema.Type<typeof PeppolVatexCode>;
