import { Schema } from 'effect';

import { PeppolTaxCategory } from '#/effect/fields/peppol-tax-category-schema';
import { opaque } from '#/effect/utils/opaque';

/**
 * @description This one is specific for TaxSubtotal since it includes more fields.
 *
 * @summary Tax Category for Tax Subtotal
 *
 * @name cac:TaxCategory
 */
export class PeppolTaxSubtotalCategory extends opaque<PeppolTaxSubtotalCategory>()(
  PeppolTaxCategory.pipe(
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
  )
) {}

export interface PeppolTaxSubTotalCategory extends Schema.Schema.Type<typeof PeppolTaxSubtotalCategory> {}
export interface PeppolTaxSubTotalCategoryEncoded extends Schema.Codec.Encoded<typeof PeppolTaxSubtotalCategory> {}
