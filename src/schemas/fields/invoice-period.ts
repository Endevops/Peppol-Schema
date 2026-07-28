import * as z from 'zod/mini';

import { vatDateCodeSchema } from '#/schemas/fields/vat-date-code';

export const invoiceLinePeriodSchema = z.object({
  /**
   * @description The date when the Invoice period for this Invoice line ends. Format ="YYYY-MM-DD"
   *
   * @example
   *   `2017-10-31`;
   *
   * @summary Invoice line period end date
   *
   * @format "YYYY-MM-DD"
   *
   * @name `cbc:EndDate`
   */
  endDate: z.optional(z.iso.date()),
  /**
   * @description The date when the Invoice period for this Invoice line starts.
   *
   * @example
   *   `2017-10-01`;
   *
   * @summary Invoice line period start date
   *
   * @format "YYYY-MM-DD"
   *
   * @name `cbc:StartDate`
   */
  startDate: z.optional(z.iso.date()),
});

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
export type PeppolInvoiceLinePeriod = z.infer<typeof invoiceLinePeriodSchema>;
export type PeppolInvoicePeriod = z.infer<typeof invoicePeriodSchema>;
