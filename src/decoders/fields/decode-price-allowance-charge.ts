import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { decodeAmount } from '#/decoders/fields/decode-amount.ts';
import { bool } from '#/helpers/bool.ts';
import { getProp } from '#/helpers/get-prop.ts';

export const decodePriceAllowanceCharge = Effect.fn(function* (allowanceCharges: XmlNode, ...path: Array<string>) {
  const allowanceCharge = yield* getProp(allowanceCharges, ...path);
  if (Predicate.isNullish(allowanceCharge)) {
    return undefined;
  }
  return {
    amount: yield* decodeAmount(allowanceCharge, 'cbc:Amount'),
    baseAmount: yield* decodeAmount(allowanceCharge, 'cbc:BaseAmount'),
    chargeIndicator: yield* bool<false>(allowanceCharge, 'cbc:ChargeIndicator'),
  };
});
