import type { XmlNode } from '#/helpers/get-prop';

import { decodeAmount } from '#/decoders/fields/decode-amount';
import { bool } from '#/helpers/bool';
import { numOrUnd } from '#/helpers/num-or-und';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeBaseAllowanceCharge(allowanceCharge: XmlNode) {
  return {
    allowanceChargeReason: strOrUnd(allowanceCharge, 'cbc:AllowanceChargeReason'),
    allowanceChargeReasonCode: strOrUnd(allowanceCharge, 'cbc:AllowanceChargeReasonCode'),
    amount: decodeAmount(allowanceCharge, 'cbc:Amount'),
    baseAmount: decodeAmount(allowanceCharge, 'cbc:BaseAmount'),
    chargeIndicator: bool(allowanceCharge, 'cbc:ChargeIndicator'),
    multiplierFactorNumeric: numOrUnd(allowanceCharge, 'cbc:MultiplierFactorNumeric'),
  };
}
