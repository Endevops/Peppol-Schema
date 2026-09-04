import { Schema } from 'effect';

import { allowanceChargeReasonCodeSchema } from '#/effect/values/allowance-charge-reason-code';
import { chargeReasonCodeSchema } from '#/effect/values/charge-reason-code';

import { priceAllowanceChargeSchema } from './line-price-allowance-charge-schema';

const baseLineAllowanceChargeSchema = priceAllowanceChargeSchema.pipe(
  Schema.fieldsAssign({
    /**
     * @example
     *   Discount;
     *
     * @name cbc:AllowanceChargeReason
     */
    allowanceChargeReason: Schema.optionalKey(Schema.String),
    /**
     * @example
     *   20;
     *
     * @name cbc:MultiplierFactorNumeric
     */
    multiplierFactorNumeric: Schema.optionalKey(Schema.Number),
  })
);

export const lineAllowanceChargeSchema = Schema.Union([
  baseLineAllowanceChargeSchema.pipe(
    Schema.fieldsAssign({
      /**
       * @name cbc:AllowanceChargeReasonCode
       */
      allowanceChargeReasonCode: Schema.optionalKey(
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
  baseLineAllowanceChargeSchema.pipe(
    Schema.fieldsAssign({
      /**
       * @name cbc:AllowanceChargeReasonCode
       */
      allowanceChargeReasonCode: Schema.optionalKey(
        chargeReasonCodeSchema('PEPPOL-EN16931-CL003: Reason code MUST be according to UNCL 7161 D.16B.')
      ),
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

export type PeppolLineAllowanceCharge = typeof lineAllowanceChargeSchema.Type;

export { baseLineAllowanceChargeSchema };
