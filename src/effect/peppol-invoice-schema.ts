import { Schema } from 'effect';

import { peppolInvoiceLineSchema } from '#/effect/fields/peppol-invoice-line-schema';
import { peppolBillingBaseSchema } from '#/effect/peppol-billing-base-schema';
import { peppolIsoDateStringSchema } from '#/effect/peppol-iso-date-string-schema';
import { invoiceTypeCodeSchema } from '#/effect/values/invoice-type-code-schema';

export const peppolInvoiceSchema = Schema.Struct({
  ...peppolBillingBaseSchema.fields,
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
});

export type PeppolInvoice = typeof peppolInvoiceSchema.Type;
