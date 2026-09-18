import { Schema } from 'effect';

import { invoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

/**
 * @description An invoice type code from the PEPPOL subset of UNCL 1001.
 *
 * @example
 *   ```ts
 *   '71';
 *   ```;
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-inv/
 * @see {@link invoiceTypeCodesKeys}
 */
export const PeppolInvoiceTypeCode = Schema.Literals(invoiceTypeCodesKeys).pipe(Schema.brand('PeppolInvoiceTypeCode'), Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolInvoiceTypeCode}: a branded invoice type code.
 */
export type PeppolInvoiceTypeCode = Schema.Schema.Type<typeof PeppolInvoiceTypeCode>;
