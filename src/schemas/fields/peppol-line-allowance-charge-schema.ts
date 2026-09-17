import { Schema } from 'effect';

import { PriceAllowanceCharge } from '#/schemas/fields/peppol-line-price-allowance-charge-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolAllowanceChargeReasonCode } from '#/schemas/values/allowance-charge-reason-code-schema.ts';
import { PeppolChargeReasonCode } from '#/schemas/values/charge-reason-code-schema.ts';

/**
 * @description Shared fields for an allowance or charge applied to an Invoice line. Extends the price level allowance and charge fields with the reason text and
 * the multiplier factor used to calculate the amount.
 *
 * @example
 *   ```ts
 *   { amount: { value: 200, currencyId: 'EUR' }, chargeIndicator: false, allowanceChargeReason: 'Discount' }
 *   ```;
 *
 * @see {@link PeppolLineAllowanceCharge}
 */
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
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description An allowance applied to an Invoice line, marked by a `cbc:ChargeIndicator` of `false`. Adds an allowance reason code to the shared line allowance
 * and charge fields.
 *
 * @example
 *   ```ts
 *   { amount: { value: 200, currencyId: 'EUR' }, chargeIndicator: false, allowanceChargeReasonCode: '95' }
 *   ```;
 *
 * @see {@link PeppolLineAllowanceCharge}
 */
export class PeppolLineAllowance extends opaque<PeppolLineAllowance>()(
  Schema.Struct({
    ...BaseLineAllowanceCharge.fields,
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
 * @description A charge applied to an Invoice line, marked by a `cbc:ChargeIndicator` of `true`. Adds a charge reason code to the shared line allowance and charge
 * fields.
 *
 * @example
 *   ```ts
 *   { amount: { value: 25, currencyId: 'EUR' }, chargeIndicator: true, allowanceChargeReasonCode: 'AA' }
 *   ```;
 *
 * @see {@link PeppolLineAllowanceCharge}
 */
export class PeppolLineCharge extends opaque<PeppolLineCharge>()(
  Schema.Struct({
    ...BaseLineAllowanceCharge.fields,
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
 * @description An allowance or charge applied to an Invoice line, selected by the `cbc:ChargeIndicator` value: `false` selects an allowance, `true` selects a
 * charge.
 *
 * @example
 *   ```ts
 *   { amount: { value: 25, currencyId: 'EUR' }, chargeIndicator: true, allowanceChargeReasonCode: 'AA', allowanceChargeReason: 'Advertising' }
 *   ```;
 *
 * @see {@link PeppolLineAllowance}
 */
export class PeppolLineAllowanceCharge extends Schema.Union([PeppolLineAllowance, PeppolLineCharge])
  .annotate({ message: 'unable to decode line allowance charge' })
  .pipe(Schema.toStandardSchemaV1) {}

/**
 * @description Encoded form of {@link PeppolLineAllowanceCharge} produced by the Effect Schema codec.
 *
 * @see {@link PeppolLineAllowanceCharge}
 */
export type PeppolLineAllowanceChargeEncoded = Schema.Codec.Encoded<typeof PeppolLineAllowanceCharge>;
