import * as z from 'zod/mini';
import { currencyCodeSchema } from '#/schemas/values/currency-codes';

/**
 * @summary Monetary amount with mandatory currency
 *
 * @name cbc:* (+ @currencyID)
 */
export const amountSchema = z.object({
  /**
   * @name \@currencyID
   */
  currencyId: currencyCodeSchema(),
  /**
   * @name #text (value)
   */
  value: z.number(),
});

export type PeppolAmount = z.infer<typeof amountSchema>;
