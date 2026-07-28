import * as z from 'zod/mini';

import { taxCategorySchema } from '#/schemas/fields/tax-category-schema';

/**
 * @description This one is specific for TaxSubtotal since it includes more fields.
 *
 * @summary Tax Category for Tax Subtotal
 *
 * @name cac:TaxCategory
 */
export const taxSubtotalCategorySchema = z.extend(taxCategorySchema, {
  /**
   * @description The reason for the tax exemption.
   *
   * @name cbc:TaxExemptionReason
   */
  taxExemptionReason: z.optional(z.string()),
  /**
   * @description The code for the reason of the tax exemption.
   *
   * @name cbc:TaxExemptionReasonCode
   */
  taxExemptionReasonCode: z.optional(z.string()),
});
export type PeppolTaxSubTotalCategory = z.infer<typeof taxSubtotalCategorySchema>;
