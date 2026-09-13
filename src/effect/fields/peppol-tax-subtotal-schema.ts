import { Schema } from 'effect';

import { PeppolAmount } from '#/effect/fields/peppol-amount-schema';
import { PeppolTaxSubtotalCategory } from '#/effect/fields/peppol-tax-subtotal-category-schema';
import { opaque } from '#/effect/utils/opaque';

/**
 * @summary VAT breakdown (TaxSubtotal)
 *
 * @name cac:TaxSubtotal
 */
export class PeppolTaxSubtotal extends opaque<PeppolTaxSubtotal>()(
  Schema.Struct({
    /**
     * @description The amount of tax for the tax subtotal.
     *
     * @name `cbc:TaxAmount (+ @currencyID)`
     */
    taxAmount: PeppolAmount,
    /**
     * @description The tax category associated with this tax subtotal.
     *
     * @name cac:TaxCategory
     */
    taxCategory: PeppolTaxSubtotalCategory,
    /**
     * @description The taxable amount for the tax subtotal.
     *
     * @name `cbc:TaxableAmount (+ @currencyID)`
     */
    taxableAmount: PeppolAmount,
  })
) {}

export type PeppolTaxSubTotal = PeppolTaxSubtotal;
