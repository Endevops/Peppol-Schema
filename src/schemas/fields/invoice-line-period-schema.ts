import * as z from 'zod/mini';

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
export type PeppolInvoiceLinePeriod = z.infer<typeof invoiceLinePeriodSchema>;
