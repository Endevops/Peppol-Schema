import { Effect, Predicate } from 'effect';

import type { PeppolLineAllowanceCharge } from '#/schemas/fields/line-allowance-charge-schema';

import { encodeAmount } from '#/decoders/fields/encode-amount';

export const encodeLineAllowanceCharges = Effect.fn(function* (allowanceCharges: Array<PeppolLineAllowanceCharge> | undefined) {
  if (Predicate.isNullish(allowanceCharges)) return undefined;

  return yield* Effect.forEach(
    allowanceCharges,
    Effect.fn(function* (allowanceCharge: PeppolLineAllowanceCharge) {
      return {
        'cbc:ChargeIndicator': allowanceCharge.chargeIndicator,
        'cbc:AllowanceChargeReasonCode': allowanceCharge.allowanceChargeReasonCode,
        'cbc:AllowanceChargeReason': allowanceCharge.allowanceChargeReason,
        'cbc:MultiplierFactorNumeric': allowanceCharge.multiplierFactorNumeric,
        'cbc:Amount': yield* encodeAmount(allowanceCharge.amount),
        'cbc:BaseAmount': yield* encodeAmount(allowanceCharge.baseAmount),
      };
    })
  );
});
