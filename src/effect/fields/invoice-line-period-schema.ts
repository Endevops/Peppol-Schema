import { Schema } from 'effect';

import { IsoDateString } from '#/effect/iso-date-string';

export const invoiceLinePeriodSchema = Schema.Struct({
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
  endDate: Schema.optionalKey(IsoDateString),
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
  startDate: Schema.optionalKey(IsoDateString),
});

export type PeppolInvoiceLinePeriod = typeof invoiceLinePeriodSchema.Type;
