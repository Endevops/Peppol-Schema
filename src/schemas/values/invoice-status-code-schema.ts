import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
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
export class PeppolInvoiceStatusCodes extends opaque<PeppolInvoiceStatusCodes>()(
  Schema.Literals(invoiceStatusCodesKeys).pipe(Schema.brand('PeppolInvoiceStatusCodes'), Schema.toStandardSchemaV1)
) {}
