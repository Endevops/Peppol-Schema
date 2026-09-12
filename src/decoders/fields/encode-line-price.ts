import { Effect, Predicate } from 'effect';

import type { PeppolLinePrice } from '#/schemas/fields/price-schema';

import { encodeAmount } from '#/decoders/fields/encode-amount';
import { encodePriceAllowanceCharges } from '#/decoders/fields/encode-price-allowance-charges';
import { encodeQuantity } from '#/decoders/fields/encode-quantity';

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
