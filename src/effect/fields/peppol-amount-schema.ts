import { Schema } from 'effect';

import { opaque } from '#/effect/utils/opaque';
import { currencyCodeSchema } from '#/effect/values/currency-code-schema';

/**
 * @summary Monetary amount with mandatory currency
 *
 * @name cbc:* (+ @currencyID)
 */
export class PeppolAmount extends opaque<PeppolAmount>()(
  Schema.Struct({
    /**
     * @name \@currencyID
     */
    currencyId: currencyCodeSchema,
    /**
     * @name #text (value)
     */
    value: Schema.Finite,
  })
) {}
export interface PeppolAmountEncoded extends Schema.Codec.Encoded<typeof PeppolAmount> {}
