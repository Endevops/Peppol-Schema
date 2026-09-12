import { Schema } from 'effect';

import { peppolAmountSchema } from '#/effect/fields/peppol-amount-schema';

const priceAllowanceChargeSchema = Schema.Struct({
  /**
   * @example
   *   200;
   *
   * @name cbc:Amount (+ @currencyID)
   */
  amount: peppolAmountSchema,
  /**
   * @example
   *   1000;
   *
   * @name cbc:BaseAmount (+ @currencyID)
   */
  baseAmount: Schema.optional(peppolAmountSchema),
  /**
   * @name cbc:ChargeIndicator
   *
   * @value false
   */
  chargeIndicator: Schema.Boolean,
});

export const peppolLinePriceAllowanceChargeSchema = priceAllowanceChargeSchema.pipe(
  Schema.fieldsAssign({
    chargeIndicator: Schema.Literal(false).annotate({
      message: "PEPPOL-EN16931-R044: Charge on price level is NOT allowed. Only value 'false' allowed.",
    }),
  })
);

export type PeppolLinePriceAllowanceCharge = typeof peppolLinePriceAllowanceChargeSchema.Type;

export { priceAllowanceChargeSchema };
