import type { PeppolLineAllowanceCharge } from '#/schemas/fields/line-allowance-charge-schema';

import { encodeAmount } from '#/decoders/fields/encode-amount';

export function encodeLineAllowanceCharges(allowanceCharges: Array<PeppolLineAllowanceCharge> | undefined) {
  return allowanceCharges?.map(allowanceCharge => ({
    'cbc:ChargeIndicator': allowanceCharge.chargeIndicator,
    'cbc:AllowanceChargeReasonCode': allowanceCharge.allowanceChargeReasonCode,
    'cbc:AllowanceChargeReason': allowanceCharge.allowanceChargeReason,
    'cbc:MultiplierFactorNumeric': allowanceCharge.multiplierFactorNumeric,
    'cbc:Amount': encodeAmount(allowanceCharge.amount),
    'cbc:BaseAmount': encodeAmount(allowanceCharge.baseAmount),
  }));
}
