import { Schema } from 'effect';

import { peppolAmountSchema } from '#/effect/fields/peppol-amount-schema';
import { peppolTaxSubtotalSchema } from '#/effect/fields/peppol-tax-subtotal-schema';

/**
 * @summary TAX TOTAL
 *
 * @name cac:TaxTotal (1..2)
 */
export const peppolTaxTotalsBaseSchema = Schema.Struct({
  /**
   * @example
   *   200;
   *
   * @name cbc:TaxAmount (+ @currencyID)
   */
  taxAmount: peppolAmountSchema,
  /**
   * @name cac:TaxSubtotal (0..n)
   */
  taxSubtotals: Schema.optional(Schema.Array(peppolTaxSubtotalSchema)),
});

export type PeppolTaxTotal = typeof peppolTaxTotalsBaseSchema.Type;
