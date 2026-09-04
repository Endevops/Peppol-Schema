import { Schema } from 'effect';

import { amountSchema } from './amount-schema';
import { linePriceAllowanceChargeSchema } from './line-price-allowance-charge-schema';
import { quantitySchema } from './quantity-schema';

/**
 * @summary Price details on invoice line
 *
 * @name cac:Price
 */
export const linePriceSchema = Schema.Struct({
  /**
   * @name cac:AllowanceCharge
   *
   * @cardinality 0..1
   */
  allowanceCharge: Schema.optionalKey(linePriceAllowanceChargeSchema),
  /**
   * @name cbc:BaseQuantity (+ @unitCode)
   *
   * @cardinality 0..1
   */
  baseQuantity: Schema.optionalKey(quantitySchema),
  /**
   * @name cbc:PriceAmount (+ @currencyID)
   */
  priceAmount: amountSchema,
});

export type PeppolLinePrice = typeof linePriceSchema.Type;
