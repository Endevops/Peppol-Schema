import { Schema } from 'effect';

import { billingBaseSchema } from './billing-base';
import { invoiceLineSchema } from './fields/invoice-line-schema';
import { IsoDateString } from './iso-date-string';
import { invoiceTypeCodeSchema } from './values/invoice-type-code-schema';

/**
 * @description Main UBL Invoice schema (camelCase properties) Effect port of `invoiceSchema` (`z.extend(billingBaseSchema, ...)` →
 * `billingBaseSchema.pipe(Schema.fieldsAssign(...))`). `dueDate` stays a validated plain string via `IsoDateString` (no `Date` conversion);
 * `z.optional` maps to `Schema.optional` (accepts explicit `undefined`, matching decoder output).
 */
export const invoiceSchema = billingBaseSchema.pipe(
  Schema.fieldsAssign({
    /**
     * @example
     *   2017 - 11 - 01;
     *
     * @summary Payment due date
     *
     * @name cbc:DueDate
     */
    dueDate: Schema.optional(IsoDateString),
    /**
     * @summary INVOICE LINE
     *
     * @name cac:InvoiceLine
     */
    invoiceLines: Schema.Array(invoiceLineSchema).check(Schema.isMinLength(1)),
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

export type PeppolInvoice = typeof invoiceSchema.Type;
