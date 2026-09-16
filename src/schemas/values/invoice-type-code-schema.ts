import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { invoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

/**
 * @description Validates an invoice type code against the PEPPOL subset of UNCL 1001 (invoice).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid invoice type codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-inv/
 */
export class PeppolInvoiceTypeCode extends opaque<PeppolInvoiceTypeCode>()(
  Schema.Literals(invoiceTypeCodesKeys).pipe(Schema.brand('PeppolInvoiceTypeCode'))
) {}
