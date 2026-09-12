import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { decodeAmount } from '#/decoders/fields/decode-amount';
import { bool } from '#/helpers/bool';
import { numOrUnd } from '#/helpers/num-or-und';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeBaseAllowanceCharge = Effect.fn(function* (allowanceCharge: XmlNode) {
  return {
    allowanceChargeReason: yield* strOrUnd(allowanceCharge, 'cbc:AllowanceChargeReason'),
    allowanceChargeReasonCode: yield* strOrUnd(allowanceCharge, 'cbc:AllowanceChargeReasonCode'),
    amount: yield* decodeAmount(allowanceCharge, 'cbc:Amount'),
    baseAmount: yield* decodeAmount(allowanceCharge, 'cbc:BaseAmount'),
    chargeIndicator: yield* bool(allowanceCharge, 'cbc:ChargeIndicator'),
    multiplierFactorNumeric: yield* numOrUnd(allowanceCharge, 'cbc:MultiplierFactorNumeric'),
  };
});
