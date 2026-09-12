import { Effect, Predicate } from 'effect';

import type { PeppolAllowanceCharge } from '#/schemas/fields/allowance-charge-schema';

import { encodeAmount } from '#/decoders/fields/encode-amount';
import { encodeTaxCategory } from '#/decoders/fields/encode-tax-category';

export const encodeAllowanceCharges = Effect.fn(function* (allowanceCharges: Array<PeppolAllowanceCharge> | undefined) {
  if (Predicate.isNullish(allowanceCharges)) return undefined;
  return yield* Effect.forEach(
    allowanceCharges,
    Effect.fn(function* (allowanceCharge: PeppolAllowanceCharge) {
      return {
        'cbc:ChargeIndicator': allowanceCharge.chargeIndicator,
        'cbc:AllowanceChargeReasonCode': allowanceCharge.allowanceChargeReasonCode,
        'cbc:AllowanceChargeReason': allowanceCharge.allowanceChargeReason,
        'cbc:MultiplierFactorNumeric': allowanceCharge.multiplierFactorNumeric,
        'cbc:Amount': yield* encodeAmount(allowanceCharge.amount),
        'cbc:BaseAmount': yield* encodeAmount(allowanceCharge.baseAmount),
        'cac:TaxCategory': yield* encodeTaxCategory(allowanceCharge.taxCategory),
      };
    })
  );
});
