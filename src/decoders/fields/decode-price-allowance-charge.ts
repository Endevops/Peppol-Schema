import { Effect, Predicate } from 'effect';

import type { PeppolNodeError } from '#/helpers/errors';
import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolLinePriceAllowanceCharge } from '#/schemas/fields/line-price-allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeAmount } from '#/decoders/fields/decode-amount';
import { bool } from '#/helpers/bool';
import { getProp } from '#/helpers/get-prop';

export const decodePriceAllowanceCharge = Effect.fn(function* (
  allowanceCharges: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolLinePriceAllowanceCharge> | undefined, PeppolNodeError> {
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
