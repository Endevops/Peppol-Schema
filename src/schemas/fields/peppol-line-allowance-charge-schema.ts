import { Schema } from 'effect';

import { PriceAllowanceCharge } from '#/schemas/fields/peppol-line-price-allowance-charge-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { allowanceChargeReasonCodeSchema } from '#/schemas/values/allowance-charge-reason-code-schema.ts';
import { chargeReasonCodeSchema } from '#/schemas/values/charge-reason-code-schema.ts';

export class BaseLineAllowanceCharge extends opaque<BaseLineAllowanceCharge>()(
  Schema.Struct({
    ...PriceAllowanceCharge.fields /**
     * @example
     *   Discount;
     *
     * @name cbc:AllowanceChargeReason
     */,
    allowanceChargeReason: Schema.optional(Schema.String),
    /**
     * @example
     *   20;
     *
     * @name cbc:MultiplierFactorNumeric
     */
    multiplierFactorNumeric: Schema.optional(Schema.Finite),
  })
) {}

export class PeppolLineAllowance extends opaque<PeppolLineAllowance>()(
  Schema.Struct({
    ...BaseLineAllowanceCharge.fields,
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

export class PeppolLineCharge extends opaque<PeppolLineCharge>()(
  Schema.Struct({
    ...BaseLineAllowanceCharge.fields,
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

export const peppolLineAllowanceChargeSchema = Schema.Union([PeppolLineAllowance, PeppolLineCharge]).annotate({
  message: 'unable to decode line allowance charge',
});

export type PeppolLineAllowanceCharge = typeof peppolLineAllowanceChargeSchema.Type;
export type PeppolLineAllowanceChargeEncoded = typeof peppolLineAllowanceChargeSchema.Encoded;
