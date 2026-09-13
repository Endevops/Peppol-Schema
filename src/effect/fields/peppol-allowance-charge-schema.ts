import { Effect, Schema } from 'effect';

import { BaseLineAllowanceCharge } from '#/effect/fields/peppol-line-allowance-charge-schema';
import { PeppolTaxCategory } from '#/effect/fields/peppol-tax-category-schema';
import { opaque } from '#/effect/utils/opaque';
import { allowanceChargeReasonCodeSchema } from '#/effect/values/allowance-charge-reason-code-schema';
import { chargeReasonCodeSchema } from '#/effect/values/charge-reason-code-schema';
import { peppolDutyTaxFeeCategorySchema } from '#/effect/values/duty-tax-fee-category-schema';

class PeppolTaxCategoryTaxSchemeId extends opaque<PeppolTaxCategoryTaxSchemeId>()(
  Schema.Struct({
    /**
     * @description Mandatory element. Use "VAT"
     *
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(Schema.withDecodingDefaultType(Effect.succeed('VAT'))),
  })
) {}

class BaseAllowanceCharge extends opaque<BaseAllowanceCharge>()(
  BaseLineAllowanceCharge.pipe(
    Schema.fieldsAssign({
      /**
       * @summary TAX CATEGORY
       *
       * @name cac:TaxCategory
       */
      taxCategory: Schema.optional(
        PeppolTaxCategory.pipe(
          Schema.fieldsAssign({
            /**
             * @description A coded identification of what VAT category applies to the document level allowance or charge.
             *
             * @summary Document level allowance or charge VAT category code
             *
             * @name `cbc:ID`
             */
            id: peppolDutyTaxFeeCategorySchema,
            /**
             * @description The VAT rate, represented as percentage that applies to the document level allowance or charge.
             *
             * @summary Document level allowance or charge VAT rate
             *
             * @name `cbc:Percent`
             */
            percent: Schema.optional(Schema.Finite),
            /**
             * @default VAT
             *
             * @name `cac:TaxScheme`
             */
            taxSchemeId: PeppolTaxCategoryTaxSchemeId,
          })
        )
      ),
    })
  )
) {}

class AllowanceChargeFalse extends opaque<AllowanceChargeFalse>()(
  BaseAllowanceCharge.pipe(
    Schema.fieldsAssign({
      /**
       * @name cbc:AllowanceChargeReasonCode
       */
      allowanceChargeReasonCode: Schema.optional(allowanceChargeReasonCodeSchema),
      /**
       * @name cbc:ChargeIndicator
       *
       * @value false
       */
      chargeIndicator: Schema.Literal(false).annotate({
        message: "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'",
      }),
    })
  )
) {}

class AllowanceChargeTrue extends opaque<AllowanceChargeTrue>()(
  BaseAllowanceCharge.pipe(
    Schema.fieldsAssign({
      /**
       * @name cbc:AllowanceChargeReasonCode
       */
      allowanceChargeReasonCode: Schema.optional(chargeReasonCodeSchema),
      /**
       * @name cbc:ChargeIndicator
       *
       * @value false
       */
      chargeIndicator: Schema.Literal(true).annotate({
        message: "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'",
      }),
    })
  )
) {}

/**
 * @summary Allowance/Charge
 *
 * @name cac:AllowanceCharge
 */
export const peppolAllowanceChargeSchema = Schema.Union([AllowanceChargeFalse, AllowanceChargeTrue]).annotate({
  message: 'unable to decode allowance charge',
});

export type PeppolAllowanceCharge = Schema.Schema.Type<typeof peppolAllowanceChargeSchema>;
export type PeppolAllowanceChargeEncoded = Schema.Codec.Encoded<typeof peppolAllowanceChargeSchema>;
