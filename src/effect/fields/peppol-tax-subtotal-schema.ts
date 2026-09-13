import { Schema } from 'effect';

import { PeppolAmount } from '#/effect/fields/peppol-amount-schema';
import { PeppolTaxSubTotalCategory } from '#/effect/fields/peppol-tax-subtotal-category-schema';
import { opaque } from '#/effect/utils/opaque';

/**
 * @summary VAT breakdown (TaxSubtotal)
 *
 * @name cac:TaxSubtotal
 */
export class PeppolTaxSubTotal extends opaque<PeppolTaxSubTotal>()(
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
    taxCategory: PeppolTaxSubTotalCategory,
    /**
     * @description The taxable amount for the tax subtotal.
     *
     * @name `cbc:TaxableAmount (+ @currencyID)`
     */
    taxableAmount: PeppolAmount,
  })
) {}
