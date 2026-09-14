import { Schema } from 'effect';

import { PeppolTaxCategory } from '#/schemas/fields/peppol-tax-category-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description This one is specific for TaxSubtotal since it includes more fields.
 *
 * @summary Tax Category for Tax Subtotal
 *
 * @name cac:TaxCategory
 */
export class PeppolTaxSubTotalCategory extends opaque<PeppolTaxSubTotalCategory>()(
  Schema.Struct({
    ...PeppolTaxCategory.fields,
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
) {}

export interface PeppolTaxSubTotalCategoryEncoded extends Schema.Codec.Encoded<typeof PeppolTaxSubTotalCategory> {}
