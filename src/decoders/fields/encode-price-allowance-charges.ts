import { Effect, Predicate } from 'effect';

import type { PeppolLinePriceAllowanceCharge } from '#/schemas/fields/line-price-allowance-charge-schema';

import { encodeAmount } from '#/decoders/fields/encode-amount';

export const encodePriceAllowanceCharges = Effect.fn(function* (allowanceCharge: PeppolLinePriceAllowanceCharge | undefined) {
  if (Predicate.isNullish(allowanceCharge)) {
    return undefined;
  }

  return {
    'cbc:ChargeIndicator': allowanceCharge.chargeIndicator,
    'cbc:Amount': yield* encodeAmount(allowanceCharge.amount),
    'cbc:BaseAmount': yield* encodeAmount(allowanceCharge.baseAmount),
  };
});
