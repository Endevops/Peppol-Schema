import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolCurrencyCode } from '#/schemas/values/currency-code-schema.ts';

/**
 * @description A monetary amount paired with the currency it is expressed in. Wraps a `cbc:*` amount element whose `@currencyID` attribute names the currency and
 * whose text is the value.
 *
 * @example
 *   ```ts
 *   { currencyId: 'EUR', value: 4500.0 }
 *   ```;
 *
 * @summary Monetary amount with mandatory currency
 *
 * @name cbc:* (+ @currencyID)
 */
export class PeppolAmount extends opaque<PeppolAmount>()(
  Schema.Struct({
    /**
     * @name \@currencyID
     */
    currencyId: PeppolCurrencyCode,
    /**
     * @name #text (value)
     */
    value: Schema.Finite,
  })
) {}
/**
 * @description Encoded form of {@link PeppolAmount} produced by the Effect Schema codec. Fields mirror the decoded shape.
 *
 * @see {@link PeppolAmount}
 */
export interface PeppolAmountEncoded extends Schema.Codec.Encoded<typeof PeppolAmount> {}
