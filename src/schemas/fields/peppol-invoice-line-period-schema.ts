import { Schema } from 'effect';

import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string';
import { opaque } from '#/schemas/utils/opaque';

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
