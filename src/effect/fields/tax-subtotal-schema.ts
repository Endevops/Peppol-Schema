import { Schema } from 'effect';

import { amountSchema } from './amount-schema';
import { taxSubtotalCategorySchema } from './tax-subtotal-category-schema';

/**
 * @summary VAT breakdown (TaxSubtotal)
 *
 * @name cac:TaxSubtotal
 */
export const taxSubtotalSchema = Schema.Struct({
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

export type PeppolTaxSubTotal = typeof taxSubtotalSchema.Type;
