import { Schema } from 'effect';

import { PeppolInvoiceLinePeriod } from '#/schemas/fields/peppol-invoice-line-period-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolVatDateCode } from '#/schemas/values/vat-date-code-schema.ts';

/**
 * @description A group of business terms providing information on the invoice period. Also called delivery period. If the group is used, the invoiceing period
 * start date and/or end date must be used.
 *
 * @summary DELIVERY OR INVOICE PERIOD
 *
 * @name `cac:InvoicePeriod`
 */
export class PeppolInvoicePeriod extends opaque<PeppolInvoicePeriod>()(
  PeppolInvoiceLinePeriod.pipe(
    Schema.fieldsAssign({
      /**
       * @description The code of the date when the VAT becomes acccountable for the Seller and the Buyer.
       *
       * @example
       *   `35`;
       *
       * @summary Value added tax point date code
       *
       * @name `cbc:DescriptionCode`
       */
      descriptionCode: Schema.optional(PeppolVatDateCode),
    })
  )
) {}
