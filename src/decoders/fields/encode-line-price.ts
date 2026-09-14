import { Effect, Predicate } from 'effect';

import type { PeppolLinePrice } from '#/schemas/fields/peppol-line-price-schema.ts';

import { encodeAmount } from '#/decoders/fields/encode-amount.ts';
import { encodePriceAllowanceCharges } from '#/decoders/fields/encode-price-allowance-charges.ts';
import { encodeQuantity } from '#/decoders/fields/encode-quantity.ts';

export const encodeLinePrice = Effect.fn(function* (price: PeppolLinePrice | undefined) {
  if (Predicate.isNullish(price)) {
    return undefined;
  }
  return {
    'cbc:PriceAmount': yield* encodeAmount(price.priceAmount),
    'cbc:BaseQuantity': yield* encodeQuantity(price.baseQuantity),
    'cac:AllowanceCharge': yield* encodePriceAllowanceCharges(price.allowanceCharge),
  };
});
