import { Schema } from 'effect';

import { amountSchema } from './amount-schema';

const priceAllowanceChargeSchema = Schema.Struct({
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
  baseAmount: Schema.optionalKey(amountSchema),
  /**
   * @name cbc:ChargeIndicator
   *
   * @value false
   */
  chargeIndicator: Schema.Boolean,
});

export const linePriceAllowanceChargeSchema = priceAllowanceChargeSchema.pipe(
  Schema.fieldsAssign({
    chargeIndicator: Schema.Literal(false).annotate({
      message: "PEPPOL-EN16931-R044: Charge on price level is NOT allowed. Only value 'false' allowed.",
    }),
  })
);

export type PeppolLinePriceAllowanceCharge = typeof linePriceAllowanceChargeSchema.Type;

export { priceAllowanceChargeSchema };
