import { Effect, Schema } from 'effect';

import { BaseLineAllowanceCharge } from '#/schemas/fields/peppol-line-allowance-charge-schema.ts';
import { PeppolTaxCategory } from '#/schemas/fields/peppol-tax-category-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolAllowanceChargeReasonCode } from '#/schemas/values/allowance-charge-reason-code-schema.ts';
import { PeppolChargeReasonCode } from '#/schemas/values/charge-reason-code-schema.ts';
import { PeppolDutyTaxFeeCategoryCode } from '#/schemas/values/duty-tax-fee-category-schema.ts';

/**
 * @description The identifier of the tax scheme that applies to a document level allowance or charge. Defaults to `VAT` when the value is absent.
 *
 * @example
 *   ```ts
 *   { id: 'VAT' }
 *   ```;
 *
 * @see {@link PeppolTaxCategory}
 */
export class PeppolTaxCategoryTaxSchemeId extends opaque<PeppolTaxCategoryTaxSchemeId>()(
  Schema.Struct({
    /**
     * @description Mandatory element. Use "VAT"
     *
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(Schema.withDecodingDefaultType(Effect.succeed('VAT'))),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description Shared fields for a document level allowance or charge. Combines the common line allowance and charge fields with the tax category that applies to
 * the document level amount.
 *
 * @example
 *   ```ts
 *   {
 *     amount: { value: 25, currencyId: 'EUR' },
 *     chargeIndicator: true,
 *     allowanceChargeReason: 'Insurance',
 *     taxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } }
 *   }
 *   ```;
 *
 * @see {@link PeppolAllowanceCharge}
 */
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
          id: PeppolDutyTaxFeeCategoryCode,
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
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description A document level allowance, marked by a `cbc:ChargeIndicator` of `false`. Adds an allowance reason code to the shared document level allowance and
 * charge fields.
 *
 * @example
 *   ```ts
 *   { amount: { value: 200, currencyId: 'EUR' }, chargeIndicator: false, allowanceChargeReasonCode: '95' }
 *   ```;
 *
 * @see {@link PeppolAllowanceCharge}
 */
export class PeppolAllowance extends opaque<PeppolAllowance>()(
  Schema.Struct({
    ...BaseAllowanceCharge.fields,
    /**
     * @name cbc:AllowanceChargeReasonCode
     */
    allowanceChargeReasonCode: Schema.optional(PeppolAllowanceChargeReasonCode),
    /**
     * @name cbc:ChargeIndicator
     *
     * @value `false`
     */
    chargeIndicator: Schema.Literal(false).annotate({
      message: "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'",
    }),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description A document level charge, marked by a `cbc:ChargeIndicator` of `true`. Adds a charge reason code to the shared document level allowance and charge
 * fields.
 *
 * @example
 *   ```ts
 *   { amount: { value: 25, currencyId: 'EUR' }, chargeIndicator: true, allowanceChargeReasonCode: 'AA' }
 *   ```;
 *
 * @see {@link PeppolAllowanceCharge}
 */
export class PeppolCharge extends opaque<PeppolCharge>()(
  Schema.Struct({
    ...BaseAllowanceCharge.fields,
    /**
     * @name cbc:AllowanceChargeReasonCode
     */
    allowanceChargeReasonCode: Schema.optional(PeppolChargeReasonCode),
    /**
     * @name cbc:ChargeIndicator
     *
     * @value `true`
     */
    chargeIndicator: Schema.Literal(true).annotate({
      message: "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'",
    }),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description A document level allowance or charge, selected by the `cbc:ChargeIndicator` value: `false` selects an allowance, `true` selects a charge.
 *
 * @summary Allowance/Charge
 *
 * @name cac:AllowanceCharge
 */
export class PeppolAllowanceCharge extends Schema.Union([PeppolAllowance, PeppolCharge])
  .annotate({ message: 'unable to decode allowance charge' })
  .pipe(Schema.toStandardSchemaV1) {}

/**
 * @description Encoded form of {@link PeppolAllowanceCharge} produced by the Effect Schema codec.
 *
 * @see {@link PeppolAllowanceCharge}
 */
export type PeppolAllowanceChargeEncoded = Schema.Codec.Encoded<typeof PeppolAllowanceCharge>;
