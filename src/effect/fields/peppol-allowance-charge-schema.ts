import { Effect, Schema } from 'effect';

import { baseLineAllowanceChargeSchema } from '#/effect/fields/peppol-line-allowance-charge-schema';
import { peppolTaxCategorySchema } from '#/effect/fields/peppol-tax-category-schema';
import { allowanceChargeReasonCodeSchema } from '#/effect/values/allowance-charge-reason-code-schema';
import { chargeReasonCodeSchema } from '#/effect/values/charge-reason-code-schema';
import { dutyTaxFeeCategorySchema } from '#/effect/values/duty-tax-fee-category-schema';

const baseAllowanceChargeSchema = baseLineAllowanceChargeSchema.pipe(
  Schema.fieldsAssign({
    /**
     * @summary TAX CATEGORY
     *
     * @name cac:TaxCategory
     */
    taxCategory: Schema.optional(
      peppolTaxCategorySchema.pipe(
        Schema.fieldsAssign({
          /**
           * @description A coded identification of what VAT category applies to the document level allowance or charge.
           *
           * @summary Document level allowance or charge VAT category code
           *
           * @name `cbc:ID`
           */
          id: dutyTaxFeeCategorySchema(),
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
          taxSchemeId: Schema.Struct({
            /**
             * @description Mandatory element. Use "VAT"
             *
             * @name `cbc:ID`
             */
            id: Schema.String.pipe(Schema.withDecodingDefaultType(Effect.succeed('VAT'))),
          }),
        })
      )
    ),
  })
);

/**
 * @summary Allowance/Charge
 *
 * @name cac:AllowanceCharge
 */
export const peppolAllowanceChargeSchema = Schema.Union([
  baseAllowanceChargeSchema.pipe(
    Schema.fieldsAssign({
      /**
       * @name cbc:AllowanceChargeReasonCode
       */
      allowanceChargeReasonCode: Schema.optional(
        allowanceChargeReasonCodeSchema('PEPPOL-EN16931-CL002: Reason code MUST be according to subset of UNCL 5189 D.16B.')
      ),
      /**
       * @name cbc:ChargeIndicator
       *
       * @value false
       */
      chargeIndicator: Schema.Literal(false).annotate({
        message: "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'",
      }),
    })
  ),
  baseAllowanceChargeSchema.pipe(
    Schema.fieldsAssign({
      /**
       * @name cbc:AllowanceChargeReasonCode
       */
      allowanceChargeReasonCode: Schema.optional(chargeReasonCodeSchema('PEPPOL-EN16931-CL003: Reason code MUST be according to UNCL 7161 D.16B.')),
      /**
       * @name cbc:ChargeIndicator
       *
       * @value false
       */
      chargeIndicator: Schema.Literal(true).annotate({
        message: "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'",
      }),
    })
  ),
]).annotate({ message: 'unable to decode allowance charge' });

export type PeppolAllowanceCharge = typeof peppolAllowanceChargeSchema.Type;
