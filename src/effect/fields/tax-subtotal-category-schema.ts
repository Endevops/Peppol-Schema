import { Schema } from 'effect';

import { taxCategorySchema } from './tax-category-schema';

/**
 * @description This one is specific for TaxSubtotal since it includes more fields.
 *
 * @summary Tax Category for Tax Subtotal
 *
 * @name cac:TaxCategory
 */
export const taxSubtotalCategorySchema = taxCategorySchema.pipe(
  Schema.fieldsAssign({
    /**
     * @description The reason for the tax exemption.
     *
     * @name cbc:TaxExemptionReason
     */
    taxExemptionReason: Schema.optionalKey(Schema.String),
    /**
     * @description The code for the reason of the tax exemption.
     *
     * @name cbc:TaxExemptionReasonCode
     */
    taxExemptionReasonCode: Schema.optionalKey(Schema.String),
  })
);

export type PeppolTaxSubTotalCategory = typeof taxSubtotalCategorySchema.Type;
