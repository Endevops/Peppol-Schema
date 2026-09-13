import { Schema } from 'effect';

import { PriceAllowanceCharge } from '#/effect/fields/peppol-line-price-allowance-charge-schema';
import { opaque } from '#/effect/utils/opaque';
import { allowanceChargeReasonCodeSchema } from '#/effect/values/allowance-charge-reason-code-schema';
import { chargeReasonCodeSchema } from '#/effect/values/charge-reason-code-schema';

class BaseLineAllowanceCharge extends opaque<BaseLineAllowanceCharge>()(
  PriceAllowanceCharge.pipe(
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
  )
) {}

class LineAllowanceChargeFalse extends opaque<LineAllowanceChargeFalse>()(
  BaseLineAllowanceCharge.pipe(
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

class LineAllowanceChargeTrue extends opaque<LineAllowanceChargeTrue>()(
  BaseLineAllowanceCharge.pipe(
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

export const peppolLineAllowanceChargeSchema = Schema.Union([LineAllowanceChargeFalse, LineAllowanceChargeTrue]).annotate({
  message: 'unable to decode line allowance charge',
});

export type PeppolLineAllowanceCharge = typeof peppolLineAllowanceChargeSchema.Type;
export type PeppolLineAllowanceChargeEncoded = typeof peppolLineAllowanceChargeSchema.Encoded;

export { BaseLineAllowanceCharge };
