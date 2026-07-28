import * as z from 'zod/mini';

import { amountSchema } from '#/schemas/fields/amount-schema';
import { taxSubtotalSchema } from '#/schemas/fields/tax-subtotal-schema';

/**
 * @summary TAX TOTAL
 *
 * @name cac:TaxTotal (1..2)
 */
export const taxTotalsBaseSchema = z.object({
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
  taxSubtotals: z.optional(z.array(taxSubtotalSchema)),
});

export type PeppolTaxTotal = z.infer<typeof taxTotalsBaseSchema>;
