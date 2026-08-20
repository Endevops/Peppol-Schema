import * as z from 'zod/mini';

import { amountSchema } from '#/schemas/fields/amount-schema';
import { linePriceAllowanceChargeSchema } from '#/schemas/fields/line-price-allowance-charge-schema';
import { quantitySchema } from '#/schemas/fields/quantity-schema';

/**
 * @summary Price details on invoice line
 *
 * @name cac:Price
 */
export const linePriceSchema = z.object({
  /**
   * @name cac:AllowanceCharge
   *
   * @cardinality 0..1
   */
  allowanceCharge: z.optional(linePriceAllowanceChargeSchema),
  /**
   * @name cbc:BaseQuantity (+ @unitCode)
   *
   * @cardinality 0..1
   */
  baseQuantity: z.optional(quantitySchema),
  /**
   * @name cbc:PriceAmount (+ @currencyID)
   */
  priceAmount: amountSchema,
});

export type PeppolLinePrice = z.infer<typeof linePriceSchema>;
