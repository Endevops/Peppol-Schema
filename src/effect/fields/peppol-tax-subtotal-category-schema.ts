import { Schema } from 'effect';

import { peppolTaxCategorySchema } from './peppol-tax-category-schema';

/**
 * @description This one is specific for TaxSubtotal since it includes more fields.
 *
 * @summary Tax Category for Tax Subtotal
 *
 * @name cac:TaxCategory
 */
export const peppolTaxSubtotalCategorySchema = peppolTaxCategorySchema.pipe(
  Schema.fieldsAssign({
    /**
     * @description The reason for the tax exemption.
     *
     * @name cbc:TaxExemptionReason
     */
    taxExemptionReason: Schema.optional(Schema.String),
    /**
     * @description The code for the reason of the tax exemption.
     *
     * @name cbc:TaxExemptionReasonCode
     */
    taxExemptionReasonCode: Schema.optional(Schema.String),
  })
);

export type PeppolTaxSubTotalCategory = typeof peppolTaxSubtotalCategorySchema.Type;
