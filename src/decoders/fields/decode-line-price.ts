import { Effect, Predicate } from 'effect';

import type { PeppolNodeError } from '#/helpers/errors';
import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolLinePrice } from '#/schemas/fields/price-schema';
import type { RecursivePartial } from '#/types';

import { decodeAmount } from '#/decoders/fields/decode-amount';
import { decodePriceAllowanceCharge } from '#/decoders/fields/decode-price-allowance-charge';
import { decodeQuantity } from '#/decoders/fields/decode-quantity';
import { getProp } from '#/helpers/get-prop';

export const decodeLinePrice = Effect.fn(function* (
  price: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolLinePrice> | undefined, PeppolNodeError> {
  const node = yield* getProp(price, ...path);
  if (Predicate.isNullish(node)) return undefined;

  return {
    allowanceCharge: yield* decodePriceAllowanceCharge(node, 'cac:AllowanceCharge'),
    baseQuantity: yield* decodeQuantity(node, 'cbc:BaseQuantity'),
    priceAmount: yield* decodeAmount(node, 'cbc:PriceAmount'),
  };
});
