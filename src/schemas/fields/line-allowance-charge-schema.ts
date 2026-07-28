import * as z from 'zod/mini';

import { priceAllowanceChargeSchema } from '#/schemas/fields/line-price-allowance-charge-schema';
import { allowanceChargeReasonCodeSchema } from '#/schemas/values/allowance-charge-reason-code';
import { chargeReasonCodeSchema } from '#/schemas/values/charge-reason-code';

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

export { baseLineAllowanceChargeSchema };
