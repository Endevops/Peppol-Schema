import * as z from 'zod/mini';

import { billingBaseSchema } from '#/schemas/billing-base';
import { invoiceLineSchema } from '#/schemas/fields/invoice-line-schema';
import { invoiceTypeCodeSchema } from '#/schemas/values/invoice-type-code-schema';

/**
 * @description Main UBL Invoice schema (camelCase properties)
 */
export const invoiceSchema = z.extend(billingBaseSchema, {
  /**
   * @example
   *   2017 - 11 - 01;
   *
   * @summary Payment due date
   *
   * @name cbc:DueDate
   */
  dueDate: z.optional(z.iso.date()),
  /**
   * @summary INVOICE LINE
   *
   * @name cac:InvoiceLine
   */
  invoiceLines: z.array(invoiceLineSchema).check(z.minLength(1)),
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
  projectReference: z.optional(z.object({ id: z.string() })),
});

export type PeppolInvoice = z.infer<typeof invoiceSchema>;
