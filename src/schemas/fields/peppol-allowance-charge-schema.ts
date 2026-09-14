import { Effect, Schema } from 'effect';

import { BaseLineAllowanceCharge } from '#/schemas/fields/peppol-line-allowance-charge-schema.ts';
import { PeppolTaxCategory } from '#/schemas/fields/peppol-tax-category-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { allowanceChargeReasonCodeSchema } from '#/schemas/values/allowance-charge-reason-code-schema.ts';
import { chargeReasonCodeSchema } from '#/schemas/values/charge-reason-code-schema.ts';
import { peppolDutyTaxFeeCategorySchema } from '#/schemas/values/duty-tax-fee-category-schema.ts';

export class PeppolTaxCategoryTaxSchemeId extends opaque<PeppolTaxCategoryTaxSchemeId>()(
  Schema.Struct({
    /**
     * @description Mandatory element. Use "VAT"
     *
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(Schema.withDecodingDefaultType(Effect.succeed('VAT'))),
  })
) {}

export class BaseAllowanceCharge extends opaque<BaseAllowanceCharge>()(
  Schema.Struct({
    ...BaseLineAllowanceCharge.fields,
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
) {}

export class PeppolAllowance extends opaque<PeppolAllowance>()(
  Schema.Struct({
    ...BaseAllowanceCharge.fields,
    /**
     * @name cbc:AllowanceChargeReasonCode
     */
    allowanceChargeReasonCode: Schema.optional(allowanceChargeReasonCodeSchema),
    /**
     * @name cbc:ChargeIndicator
     *
     * @value `false`
     */
    chargeIndicator: Schema.Literal(false).annotate({
      message: "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'",
    }),
  })
) {}

export class PeppolCharge extends opaque<PeppolCharge>()(
  Schema.Struct({
    ...BaseAllowanceCharge.fields,
    /**
     * @name cbc:AllowanceChargeReasonCode
     */
    allowanceChargeReasonCode: Schema.optional(chargeReasonCodeSchema),
    /**
     * @name cbc:ChargeIndicator
     *
     * @value `true`
     */
    chargeIndicator: Schema.Literal(true).annotate({
      message: "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'",
    }),
  })
) {}

/**
 * @summary Allowance/Charge
 *
 * @name cac:AllowanceCharge
 */
export const peppolAllowanceChargeSchema = Schema.Union([PeppolAllowance, PeppolCharge]).annotate({ message: 'unable to decode allowance charge' });

export type PeppolAllowanceCharge = Schema.Schema.Type<typeof peppolAllowanceChargeSchema>;
export type PeppolAllowanceChargeEncoded = Schema.Codec.Encoded<typeof peppolAllowanceChargeSchema>;
