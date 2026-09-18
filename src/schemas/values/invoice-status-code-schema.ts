import { Schema } from 'effect';

import { invoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

/**
 * @description An invoice status code from the PEPPOL subset of UNCL 4343 (T111).
 *
 * @example
 *   ```ts
 *   'AB';
 *   ```;
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4343-T111/
 * @see {@link invoiceStatusCodesKeys}
 */
export const PeppolInvoiceStatusCodes = Schema.Literals(invoiceStatusCodesKeys).pipe(
  Schema.brand('PeppolInvoiceStatusCodes'),
  Schema.toStandardSchemaV1
);

/**
 * @description Decoded form of {@link PeppolInvoiceStatusCodes}.
 */
export type PeppolInvoiceStatusCodes = Schema.Schema.Type<typeof PeppolInvoiceStatusCodes>;
