import { Schema } from 'effect';

import { amountSchema } from './amount-schema';
import { taxSubtotalSchema } from './tax-subtotal-schema';

/**
 * @summary TAX TOTAL
 *
 * @name cac:TaxTotal (1..2)
 */
export const taxTotalsBaseSchema = Schema.Struct({
  /**
   * @example
   *   200;
   *
   * @name cbc:TaxAmount (+ @currencyID)
   */
  taxAmount: amountSchema,
  /**
   * @name cac:TaxSubtotal (0..n)
   */
  taxSubtotals: Schema.optionalKey(Schema.Array(taxSubtotalSchema)),
});

export type PeppolTaxTotal = typeof taxTotalsBaseSchema.Type;
