import * as z from 'zod/mini';

import { invoiceLinePeriodSchema } from '#/schemas/fields/invoice-line-period-schema';
import { vatDateCodeSchema } from '#/schemas/fields/vat-date-code';

/**
 * @description A group of business terms providing information on the invoice period. Also called delivery period. If the group is used, the invoiceing period
 * start date and/or end date must be used.
 *
 * @summary DELIVERY OR INVOICE PERIOD
 *
 * @name `cac:InvoicePeriod`
 */
export const invoicePeriodSchema = z.extend(invoiceLinePeriodSchema, {
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
  descriptionCode: z.optional(vatDateCodeSchema()),
});
export type PeppolInvoicePeriod = z.infer<typeof invoicePeriodSchema>;
