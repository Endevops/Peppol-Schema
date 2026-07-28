import * as z from 'zod/mini';
import { amountSchema } from '#/schemas/fields/amount-schema';
import { taxCategorySchema } from '#/schemas/fields/tax-category-schema';
import { allowanceChargeReasonCodeSchema } from '#/schemas/values/allowance-charge-reason-code';
import { chargeReasonCodeSchema } from '#/schemas/values/charge-reason-code';
import { dutyTaxFeeCategorySchema } from '#/schemas/values/duty-tax-fee-cateogries';

/**
 * @description ALLOWANCE.
 *
 * @name cac:PriceAllowanceCharge
 */
const priceAllowanceChargeSchema = z.object({
  /**
   * @example
   *   200;
   *
   * @name cbc:Amount (+ @currencyID)
   */
  amount: amountSchema,
  /**
   * @example
   *   1000;
   *
   * @name cbc:BaseAmount (+ @currencyID)
   */
  baseAmount: z.optional(amountSchema),
  /**
   * @name cbc:ChargeIndicator
   *
   * @value false
   */
  chargeIndicator: z.boolean(),
});

export const linePriceAllowanceChargeSchema = z.safeExtend(priceAllowanceChargeSchema, {
  chargeIndicator: z.literal(false, "PEPPOL-EN16931-R044: Charge on price level is NOT allowed. Only value 'false' allowed."),
});
export type PeppolLinePriceAllowanceCharge = z.infer<typeof linePriceAllowanceChargeSchema>;

const baseLineAllowanceChargeSchema = z.extend(priceAllowanceChargeSchema, {
  /**
   * @example
   *   Discount;
   *
   * @name cbc:AllowanceChargeReason
   */
  allowanceChargeReason: z.optional(z.string()),
  /**
   * @example
   *   20;
   *
   * @name cbc:MultiplierFactorNumeric
   */
  multiplierFactorNumeric: z.optional(z.number()),
});

export const lineAllowanceChargeSchema = z.discriminatedUnion(
  'chargeIndicator',
  [
    z.extend(baseLineAllowanceChargeSchema, {
      /**
       * @name cbc:AllowanceChargeReasonCode
       */
      allowanceChargeReasonCode: z.optional(
        allowanceChargeReasonCodeSchema('PEPPOL-EN16931-CL002: Reason code MUST be according to subset of UNCL 5189 D.16B.')
      ),
      /**
       * @name cbc:ChargeIndicator
       *
       * @value false
       */
      chargeIndicator: z.literal(false, "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'"),
    }),
    z.extend(baseLineAllowanceChargeSchema, {
      /**
       * @name cbc:AllowanceChargeReasonCode
       */
      allowanceChargeReasonCode: z.optional(chargeReasonCodeSchema('PEPPOL-EN16931-CL003: Reason code MUST be according to UNCL 7161 D.16B.')),
      /**
       * @name cbc:ChargeIndicator
       *
       * @value false
       */
      chargeIndicator: z.literal(true, "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'"),
    }),
  ],
  'unable to decode line allowance charge'
);

export type PeppolLineAllowanceCharge = z.infer<typeof lineAllowanceChargeSchema>;

const baseAllowanceChargeSchema = z.extend(baseLineAllowanceChargeSchema, {
  /**
   * @summary TAX CATEGORY
   *
   * @name cac:TaxCategory
   */
  taxCategory: z.optional(
    z.extend(taxCategorySchema, {
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
      percent: z.optional(z.number()),
      /**
       * @default VAT
       *
       * @name `cac:TaxScheme`
       */
      taxSchemeId: z.object({
        /**
         * @description Mandatory element. Use “VAT”
         *
         * @name `cbc:ID`
         */
        id: z._default(z.string(), 'VAT'),
      }),
    })
  ),
});
/**
 * @summary Allowance/Charge
 *
 * @name cac:AllowanceCharge
 */
export const allowanceChargeSchema = z.discriminatedUnion(
  'chargeIndicator',
  [
    z.extend(baseAllowanceChargeSchema, {
      /**
       * @name cbc:AllowanceChargeReasonCode
       */
      allowanceChargeReasonCode: z.optional(
        allowanceChargeReasonCodeSchema('PEPPOL-EN16931-CL002: Reason code MUST be according to subset of UNCL 5189 D.16B.')
      ),
      /**
       * @name cbc:ChargeIndicator
       *
       * @value false
       */
      chargeIndicator: z.literal(false, "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'"),
    }),
    z.extend(baseAllowanceChargeSchema, {
      /**
       * @name cbc:AllowanceChargeReasonCode
       */
      allowanceChargeReasonCode: z.optional(chargeReasonCodeSchema('PEPPOL-EN16931-CL003: Reason code MUST be according to UNCL 7161 D.16B.')),
      /**
       * @name cbc:ChargeIndicator
       *
       * @value false
       */
      chargeIndicator: z.literal(true, "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'"),
    }),
  ],
  'unable to decode allowance charge'
);
export type PeppolAllowanceCharge = z.infer<typeof allowanceChargeSchema>;
