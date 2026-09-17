import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema.ts';
import { PeppolTaxSubTotalCategory } from '#/schemas/fields/peppol-tax-subtotal-category-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A VAT breakdown line for a single tax category, giving the taxable amount and the tax amount.
 *
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
  }).pipe(Schema.toStandardSchemaV1)
) {}
