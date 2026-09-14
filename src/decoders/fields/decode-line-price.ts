import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { decodeAmount } from '#/decoders/fields/decode-amount.ts';
import { decodePriceAllowanceCharge } from '#/decoders/fields/decode-price-allowance-charge.ts';
import { decodeQuantity } from '#/decoders/fields/decode-quantity.ts';
import { getProp } from '#/helpers/get-prop.ts';

export const decodeLinePrice = Effect.fn(function* (price: XmlNode, ...path: Array<string>) {
  const node = yield* getProp(price, ...path);
  if (Predicate.isNullish(node)) return undefined;

  return {
    allowanceCharge: yield* decodePriceAllowanceCharge(node, 'cac:AllowanceCharge'),
    baseQuantity: yield* decodeQuantity(node, 'cbc:BaseQuantity'),
    priceAmount: yield* decodeAmount(node, 'cbc:PriceAmount'),
  };
});
