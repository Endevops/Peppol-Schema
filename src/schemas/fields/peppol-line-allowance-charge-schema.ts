import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema.ts';
import { CAC_NAMESPACE, CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolAllowanceChargeReasonCode } from '#/schemas/values/allowance-charge-reason-code-schema.ts';
import { PeppolChargeReasonCode } from '#/schemas/values/charge-reason-code-schema.ts';

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
    allowanceChargeReasonCode: Schema.optional(PeppolAllowanceChargeReasonCode).pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'AllowanceChargeReasonCode' })
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
    multiplierFactorNumeric: Schema.optional(Schema.Finite).pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'MultiplierFactorNumeric', examples: [20] })
    ),

    /**
     * @example
     *   200;
     *
     * @name cbc:Amount (+ @currencyID)
     */
    amount: PeppolAmount.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'Amount', examples: [{ value: 200, currencyId: 'EUR' }] })
    ),

    /**
     * @example
     *   ```
     *  1000
     *  ```;
     *
     * @name cbc:BaseAmount (+ @currencyID)
     */
    baseAmount: Schema.optional(PeppolAmount).pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'BaseAmount', examples: [{ value: 1000, currencyId: 'EUR' }] })
    ),
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
    /**
     * @name cbc:ChargeIndicator
     *
     * @value `true`
     */
    chargeIndicator: Schema.Literal(true)
      .annotate({ message: "PEPPOL-EN16931-R043: Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'" })
      .pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ChargeIndicator' })),

    /**
     * @name cbc:AllowanceChargeReasonCode
     */
    allowanceChargeReasonCode: Schema.optional(PeppolChargeReasonCode).pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'AllowanceChargeReasonCode' })
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
    multiplierFactorNumeric: Schema.optional(Schema.Finite).pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'MultiplierFactorNumeric', examples: [20] })
    ),

    /**
     * @example
     *   200;
     *
     * @name cbc:Amount (+ @currencyID)
     */
    amount: PeppolAmount.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'Amount', examples: [{ value: 200, currencyId: 'EUR' }] })
    ),

    /**
     * @example
     *   ```
     *  1000
     *  ```;
     *
     * @name cbc:BaseAmount (+ @currencyID)
     */
    baseAmount: Schema.optional(PeppolAmount).pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'BaseAmount', examples: [{ value: 1000, currencyId: 'EUR' }] })
    ),
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
export const PeppolLineAllowanceCharge = Schema.Union([PeppolLineAllowance, PeppolLineCharge]).pipe(
  Schema.annotate({
    message: 'unable to decode line allowance charge',
    xmlNamespace: CAC_NAMESPACE,
    xmlPrefix: 'cac',
    xmlName: 'AllowanceCharge',
    description: 'A group of business terms providing information about allowances or charges applicable to the individual Invoice line.',
    title: 'Invoice line allowances or charges',
  }),
  Schema.toStandardSchemaV1
);

/**
 * @description Decoded form of {@link PeppolLineAllowanceCharge}: a line level allowance or charge.
 */
export type PeppolLineAllowanceCharge = Schema.Schema.Type<typeof PeppolLineAllowanceCharge>;

/**
 * @description Encoded form of {@link PeppolLineAllowanceCharge} produced by the Effect Schema codec.
 *
 * @see {@link PeppolLineAllowanceCharge}
 */
export type PeppolLineAllowanceChargeEncoded = Schema.Codec.Encoded<typeof PeppolLineAllowanceCharge>;
