import { Schema } from 'effect';

import { priceAllowanceChargeSchema } from '#/effect/fields/peppol-line-price-allowance-charge-schema';
import { allowanceChargeReasonCodeSchema } from '#/effect/values/allowance-charge-reason-code-schema';
import { chargeReasonCodeSchema } from '#/effect/values/charge-reason-code-schema';

const baseLineAllowanceChargeSchema = priceAllowanceChargeSchema.pipe(
  Schema.fieldsAssign({
    /**
     * @example
     *   Discount;
     *
     * @name cbc:AllowanceChargeReason
     */
    allowanceChargeReason: Schema.optional(Schema.String),
    /**
     * @example
     *   20;
     *
     * @name cbc:MultiplierFactorNumeric
     */
    multiplierFactorNumeric: Schema.optional(Schema.Finite),
  })
);

export const peppolLineAllowanceChargeSchema = Schema.Union([
  baseLineAllowanceChargeSchema.pipe(
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
  ),
  baseLineAllowanceChargeSchema.pipe(
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
  ),
]).annotate({ message: 'unable to decode line allowance charge' });

export type PeppolLineAllowanceCharge = typeof peppolLineAllowanceChargeSchema.Type;

export { baseLineAllowanceChargeSchema };
