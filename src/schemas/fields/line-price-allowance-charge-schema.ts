import * as z from 'zod/mini';

import { amountSchema } from '#/schemas/fields/amount-schema';

const priceAllowanceChargeSchema = z.object({
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
  baseAmount: z.optional(amountSchema),
  /**
   * @name cbc:ChargeIndicator
   *
   * @value false
   */
  chargeIndicator: z.boolean(),
});

export const linePriceAllowanceChargeSchema = z.safeExtend(priceAllowanceChargeSchema, {
  chargeIndicator: z.literal(false, "PEPPOL-EN16931-R044: Charge on price level is NOT allowed. Only value 'false' allowed."),
});
export type PeppolLinePriceAllowanceCharge = z.infer<typeof linePriceAllowanceChargeSchema>;

export { priceAllowanceChargeSchema };
