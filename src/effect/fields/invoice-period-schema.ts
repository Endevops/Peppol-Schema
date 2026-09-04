import { Schema } from 'effect';

import { vatDateCodeSchema } from '#/effect/values/vat-date-code';

import { invoiceLinePeriodSchema } from './invoice-line-period-schema';

/**
 * @description A group of business terms providing information on the invoice period. Also called delivery period. If the group is used, the invoiceing period
 * start date and/or end date must be used.
 *
 * @summary DELIVERY OR INVOICE PERIOD
 *
 * @name `cac:InvoicePeriod`
 */
export const invoicePeriodSchema = invoiceLinePeriodSchema.pipe(
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
    descriptionCode: Schema.optional(vatDateCodeSchema()),
  })
);

export type PeppolInvoicePeriod = typeof invoicePeriodSchema.Type;
