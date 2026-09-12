import { Schema } from 'effect';

import { peppolAmountSchema } from '#/effect/fields/peppol-amount-schema';
import { peppolTaxSubtotalCategorySchema } from '#/effect/fields/peppol-tax-subtotal-category-schema';

/**
 * @summary VAT breakdown (TaxSubtotal)
 *
 * @name cac:TaxSubtotal
 */
export const peppolTaxSubtotalSchema = Schema.Struct({
  /**
   * @description The amount of tax for the tax subtotal.
   *
   * @name `cbc:TaxAmount (+ @currencyID)`
   */
  taxAmount: peppolAmountSchema,
  /**
   * @description The tax category associated with this tax subtotal.
   *
   * @name cac:TaxCategory
   */
  taxCategory: peppolTaxSubtotalCategorySchema,
  /**
   * @description The taxable amount for the tax subtotal.
   *
   * @name `cbc:TaxableAmount (+ @currencyID)`
   */
  taxableAmount: peppolAmountSchema,
});

export type PeppolTaxSubTotal = typeof peppolTaxSubtotalSchema.Type;
