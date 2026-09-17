import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
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
export class PeppolInvoiceTypeCode extends opaque<PeppolInvoiceTypeCode>()(
  Schema.Literals(invoiceTypeCodesKeys).pipe(Schema.brand('PeppolInvoiceTypeCode'))
) {}
