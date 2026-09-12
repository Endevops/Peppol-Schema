import { Schema } from 'effect';

import { peppolInvoiceLinePeriodSchema } from '#/effect/fields/peppol-invoice-line-period-schema';
import { vatDateCodeSchema } from '#/effect/values/vat-date-code-schema';

/**
 * @description A group of business terms providing information on the invoice period. Also called delivery period. If the group is used, the invoiceing period
 * start date and/or end date must be used.
 *
 * @summary DELIVERY OR INVOICE PERIOD
 *
 * @name `cac:InvoicePeriod`
 */
export const peppolInvoicePeriodSchema = peppolInvoiceLinePeriodSchema.pipe(
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
    descriptionCode: Schema.optional(vatDateCodeSchema),
  })
);

export type PeppolInvoicePeriod = typeof peppolInvoicePeriodSchema.Type;
