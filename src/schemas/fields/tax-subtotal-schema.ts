import * as z from 'zod/mini';

import { amountSchema } from '#/schemas/fields/amount-schema';
import { taxSubtotalCategorySchema } from '#/schemas/fields/tax-subtotal-category-schema';

/**
 * @summary VAT breakdown (TaxSubtotal)
 *
 * @name cac:TaxSubtotal
 */
export const taxSubtotalSchema = z.object({
  /**
   * @description The amount of tax for the tax subtotal.
   *
   * @name `cbc:TaxAmount (+ @currencyID)`
   */
  taxAmount: amountSchema,
  /**
   * @description The tax category associated with this tax subtotal.
   *
   * @name cac:TaxCategory
   */
  taxCategory: taxSubtotalCategorySchema,
  /**
   * @description The taxable amount for the tax subtotal.
   *
   * @name `cbc:TaxableAmount (+ @currencyID)`
   */
  taxableAmount: amountSchema,
});

export type PeppolTaxSubTotal = z.infer<typeof taxSubtotalSchema>;
