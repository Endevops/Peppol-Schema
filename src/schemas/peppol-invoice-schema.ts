import { Schema } from 'effect';

import { PeppolInvoiceLine } from '#/schemas/fields/peppol-invoice-line-schema';
import { PeppolBillingBase } from '#/schemas/peppol-billing-base-schema';
import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string';
import { opaque } from '#/schemas/utils/opaque';
import { invoiceTypeCodeSchema } from '#/schemas/values/invoice-type-code-schema';

class PeppolProjectReference extends opaque<PeppolProjectReference>()(Schema.Struct({ id: Schema.String })) {}

export class PeppolInvoice extends opaque<PeppolInvoice>()(
  Schema.Struct({
    ...PeppolBillingBase.fields,
    /**
     * @example
     *   2017 - 11 - 01;
     *
     * @summary Payment due date
     *
     * @name cbc:DueDate
     */
    dueDate: Schema.optional(PeppolIsoDateString),
    /**
     * @summary INVOICE LINE
     *
     * @name cac:InvoiceLine
     */
    invoiceLines: Schema.Array(PeppolInvoiceLine).check(Schema.isMinLength(1)),
    /**
     * @example
     *   380;
     *
     * @summary Invoice type code
     *
     * @name cbc:InvoiceTypeCode
     */
    invoiceTypeCode: invoiceTypeCodeSchema,
    /**
     * @summary PROJECT REFERENCE
     *
     * @name cac:ProjectReference
     */
    projectReference: Schema.optional(PeppolProjectReference),
  })
) {}
