import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolCurrencyCode } from '#/schemas/values/currency-code-schema.ts';

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
    currencyId: PeppolCurrencyCode,
    /**
     * @name #text (value)
     */
    value: Schema.Finite,
  })
) {}
export interface PeppolAmountEncoded extends Schema.Codec.Encoded<typeof PeppolAmount> {}
