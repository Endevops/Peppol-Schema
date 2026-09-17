import { Schema } from 'effect';

import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description The period relevant for an Invoice line, given by an optional start date and end date. Wraps the `cac:InvoicePeriod` element as used on a line; the
 * document level period extends this shape in {@link PeppolInvoicePeriod}.
 *
 * @example
 *   ```ts
 *   { startDate: '2017-10-01', endDate: '2017-10-31' }
 *   ```;
 *
 * @see {@link PeppolInvoicePeriod}
 */
export class PeppolInvoiceLinePeriod extends opaque<PeppolInvoiceLinePeriod>()(
  Schema.Struct({
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
    endDate: Schema.optional(PeppolIsoDateString),
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
    startDate: Schema.optional(PeppolIsoDateString),
  })
) {}
