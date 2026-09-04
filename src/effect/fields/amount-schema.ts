import { Schema } from 'effect';

import { currencyCodeSchema } from '#/effect/values/currency-codes';

/**
 * @summary Monetary amount with mandatory currency
 *
 * @name cbc:* (+ @currencyID)
 */
export const amountSchema = Schema.Struct({
  /**
   * @name \@currencyID
   */
  currencyId: currencyCodeSchema(),
  /**
   * @name #text (value)
   */
  value: Schema.Number,
});

export type PeppolAmount = typeof amountSchema.Type;
