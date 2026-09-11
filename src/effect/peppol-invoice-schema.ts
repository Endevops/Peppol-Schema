import { Schema } from 'effect';

import { peppolInvoiceLineSchema } from './fields/peppol-invoice-line-schema';
import { peppolBillingBaseSchema } from './peppol-billing-base-schema';
import { peppolIsoDateStringSchema } from './peppol-iso-date-string-schema';
import { invoiceTypeCodeSchema } from './values/invoice-type-code-schema';

/**
 * @description Main UBL Invoice schema (camelCase properties) Effect port of `invoiceSchema` (`z.extend(billingBaseSchema, ...)` →
 * `peppolBillingBaseSchema.pipe(Schema.fieldsAssign(...))`). `dueDate` stays a validated plain string via `peppolIsoDateStringSchema` (no `Date`
 * conversion); `z.optional` maps to `Schema.optional` (accepts explicit `undefined`, matching decoder output).
 */
export const peppolInvoiceSchema = peppolBillingBaseSchema.pipe(
  Schema.fieldsAssign({
    /**
     * @example
     *   2017 - 11 - 01;
     *
     * @summary Payment due date
     *
     * @name cbc:DueDate
     */
    dueDate: Schema.optional(peppolIsoDateStringSchema),
    /**
     * @summary INVOICE LINE
     *
     * @name cac:InvoiceLine
     */
    invoiceLines: Schema.Array(peppolInvoiceLineSchema).check(Schema.isMinLength(1)),
    /**
     * @example
     *   380;
     *
     * @summary Invoice type code
     *
     * @name cbc:InvoiceTypeCode
     */
    invoiceTypeCode: invoiceTypeCodeSchema(),
    /**
     * @summary PROJECT REFERENCE
     *
     * @name cac:ProjectReference
     */
    projectReference: Schema.optional(Schema.Struct({ id: Schema.String })),
  })
);

export type PeppolInvoice = typeof peppolInvoiceSchema.Type;
