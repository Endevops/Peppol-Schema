import { Effect, Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema.ts';
import { PeppolTaxCategory } from '#/schemas/fields/peppol-tax-category-schema.ts';
import { CBC_NAMESPACE, CAC_NAMESPACE } from '#/schemas/namespaces.ts';
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
    id: Schema.String.pipe(
      Schema.withDecodingDefaultType(Effect.succeed('VAT')),
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })
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
    /**
     * @name cbc:ChargeIndicator
     *
     * @value `false`
     */
    chargeIndicator: Schema.Literal(false)
      .annotate({ message: "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'" })
      .pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ChargeIndicator' })),

    /**
     * @name cbc:AllowanceChargeReasonCode
     */
    allowanceChargeReasonCode: PeppolAllowanceChargeReasonCode.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'AllowanceChargeReasonCode' }),
      Schema.optional
    ),

    /**
     * @example
     *   Discount;
     *
     * @name cbc:AllowanceChargeReason
     */
    allowanceChargeReason: Schema.String.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'AllowanceChargeReason', examples: ['Discount'] }),
      Schema.optional
    ),

    /**
     * @example
     *   20;
     *
     * @name cbc:MultiplierFactorNumeric
     */
    multiplierFactorNumeric: Schema.Finite.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'MultiplierFactorNumeric', examples: [20] }),
      Schema.optional
    ),

    /**
     * @example
     *   200;
     *
     * @name cbc:Amount (+ @currencyID)
     */
    amount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'Amount',
        examples: [{ value: 200, currencyId: 'EUR' } as PeppolAmount],
      })
    ),

    /**
     * @example
     *   ```
     *  1000
     *  ```;
     *
     * @name cbc:BaseAmount (+ @currencyID)
     */
    baseAmount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'BaseAmount',
        examples: [{ value: 1000, currencyId: 'EUR' } as PeppolAmount],
      }),
      Schema.optional
    ),

    /**
     * @summary TAX CATEGORY
     *
     * @name cac:TaxCategory
     */
    taxCategory: PeppolTaxCategory.pipe(
      Schema.fieldsAssign({
        /**
         * @default VAT
         *
         * @name `cac:TaxScheme`
         */
        taxSchemeId: PeppolTaxCategoryTaxSchemeId.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'TaxScheme' })),
      })
    ).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'TaxCategory', title: 'TAX CATEGORY' })),
  }).pipe(
    Schema.annotate({
      xmlNamespace: CAC_NAMESPACE,
      xmlPrefix: 'cac',
      xmlName: 'AllowanceCharge',
      description:
        'A document level allowance, marked by a `cbc:ChargeIndicator` of `false`. Adds an allowance reason code to the shared document level allowance and charge fields.',
    }),
    Schema.toStandardSchemaV1
  )
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
    /**
     * @name cbc:ChargeIndicator
     *
     * @value `true`
     */
    chargeIndicator: Schema.Literal(true)
      .annotate({ message: "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'" })
      .pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ChargeIndicator' }), Schema.optional),

    /**
     * @name cbc:AllowanceChargeReasonCode
     */
    allowanceChargeReasonCode: PeppolChargeReasonCode.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'AllowanceChargeReasonCode' }),
      Schema.optional
    ),

    /**
     * @example
     *   Discount;
     *
     * @name cbc:AllowanceChargeReason
     */
    allowanceChargeReason: Schema.String.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'AllowanceChargeReason', examples: ['Discount'] }),
      Schema.optional
    ),

    /**
     * @example
     *   20;
     *
     * @name cbc:MultiplierFactorNumeric
     */
    multiplierFactorNumeric: Schema.Finite.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'MultiplierFactorNumeric', examples: [20] }),
      Schema.optional
    ),

    /**
     * @example
     *   200;
     *
     * @name cbc:Amount (+ @currencyID)
     */
    amount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'Amount',
        examples: [{ value: 200, currencyId: 'EUR' } as PeppolAmount],
      })
    ),

    /**
     * @example
     *   ```
     *  1000
     *  ```;
     *
     * @name cbc:BaseAmount (+ @currencyID)
     */
    baseAmount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'BaseAmount',
        examples: [{ value: 1000, currencyId: 'EUR' } as PeppolAmount],
      }),
      Schema.optional
    ),

    /**
     * @summary TAX CATEGORY
     *
     * @name cac:TaxCategory
     */
    taxCategory: PeppolTaxCategory.pipe(
      Schema.fieldsAssign({
        /**
         * @description A coded identification of what VAT category applies to the document level allowance or charge.
         *
         * @summary Document level allowance or charge VAT category code
         *
         * @name `cbc:ID`
         */
        id: PeppolDutyTaxFeeCategoryCode.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })),
        /**
         * @description The VAT rate, represented as percentage that applies to the document level allowance or charge.
         *
         * @summary Document level allowance or charge VAT rate
         *
         * @name `cbc:Percent`
         */
        percent: Schema.Finite.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'Percent' }), Schema.optional),
        /**
         * @default VAT
         *
         * @name `cac:TaxScheme`
         */
        taxSchemeId: PeppolTaxCategoryTaxSchemeId.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'TaxScheme' })),
      })
    ).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'TaxCategory', title: 'TAX CATEGORY' }), Schema.optional),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description A document level allowance or charge, selected by the `cbc:ChargeIndicator` value: `false` selects an allowance, `true` selects a charge.
 *
 * @summary Allowance/Charge
 *
 * @name cac:AllowanceCharge
 */
export const PeppolAllowanceCharge = Schema.Union([PeppolAllowance, PeppolCharge], { mode: 'oneOf' }).pipe(
  Schema.annotate({ message: 'unable to decode allowance charge' }),
  Schema.toStandardSchemaV1
);

/**
 * @description Decoded form of {@link PeppolAllowanceCharge}: a document level allowance or charge.
 */
export type PeppolAllowanceCharge = Schema.Schema.Type<typeof PeppolAllowanceCharge>;

/**
 * @description Encoded form of {@link PeppolAllowanceCharge} produced by the Effect Schema codec.
 *
 * @see {@link PeppolAllowanceCharge}
 */
export type PeppolAllowanceChargeEncoded = Schema.Codec.Encoded<typeof PeppolAllowanceCharge>;
