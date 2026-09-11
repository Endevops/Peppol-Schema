import { Schema } from 'effect';

import { peppolAmountSchema } from './peppol-amount-schema';
import { peppolLinePriceAllowanceChargeSchema } from './peppol-line-price-allowance-charge-schema';
import { peppolQuantitySchema } from './peppol-quantity-schema';

/**
 * @summary Price details on invoice line
 *
 * @name cac:Price
 */
export const peppolLinePriceSchema = Schema.Struct({
  /**
   * @name cac:AllowanceCharge
   *
   * @cardinality 0..1
   */
  allowanceCharge: Schema.optional(peppolLinePriceAllowanceChargeSchema),
  /**
   * @name cbc:BaseQuantity (+ @unitCode)
   *
   * @cardinality 0..1
   */
  baseQuantity: Schema.optional(peppolQuantitySchema),
  /**
   * @name cbc:PriceAmount (+ @currencyID)
   */
  priceAmount: peppolAmountSchema,
});

export type PeppolLinePrice = typeof peppolLinePriceSchema.Type;
