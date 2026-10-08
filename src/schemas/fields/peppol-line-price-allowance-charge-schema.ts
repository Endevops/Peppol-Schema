import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema.ts';
import { CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A price level allowance or charge applied to the item price, expressed as an amount and a charge indicator.
 *
 * @example
 *   ```ts
 *   { amount: { value: 200, currencyId: 'EUR' }, chargeIndicator: false }
 *   ```;
 *
 * @see {@link PeppolLinePriceAllowanceCharge}
 */
class PriceAllowanceCharge extends opaque<PriceAllowanceCharge>()(
  Schema.Struct({
    /**
     * @name cbc:ChargeIndicator
     *
     * @value false
     */
    chargeIndicator: Schema.Boolean.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ChargeIndicator' })),

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
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description A price level allowance on the item price. Only allowances are allowed at price level, so the charge indicator is fixed to false.
 *
 * @example
 *   ```ts
 *   { amount: { value: 200, currencyId: 'EUR' }, chargeIndicator: false }
 *   ```;
 *
 * @see {@link PeppolLinePrice}
 */
export class PeppolLinePriceAllowanceCharge extends opaque<PeppolLinePriceAllowanceCharge>()(
  PriceAllowanceCharge.pipe(
    Schema.fieldsAssign({
      chargeIndicator: Schema.Literal(false).annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ChargeIndicator',
        message: "PEPPOL-EN16931-R044: Charge on price level is NOT allowed. Only value 'false' allowed.",
      }),
    }),
    Schema.toStandardSchemaV1
  )
) {}

export { PriceAllowanceCharge };
