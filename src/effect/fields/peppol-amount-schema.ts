import { Schema } from 'effect';

import { currencyCodeSchema } from '#/effect/values/currency-code-schema';

/**
 * @summary Monetary amount with mandatory currency
 *
 * @name cbc:* (+ @currencyID)
 */
export const peppolAmountSchema = Schema.Struct({
  /**
   * @name \@currencyID
   */
  currencyId: currencyCodeSchema,
  /**
   * @name #text (value)
   */
  value: Schema.Finite,
});

export interface PeppolAmount extends Schema.Schema.Type<typeof peppolAmountSchema> {}
export interface PeppolAmountEncoded extends Schema.Codec.Encoded<typeof peppolAmountSchema> {}
