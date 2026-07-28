import type { PeppolAllowanceCharge } from '#/schemas/fields/allowance-charge-schema';

import { encodeAmount } from '#/decoders/fields/encode-amount';
import { encodeTaxCategory } from '#/decoders/fields/encode-tax-category';

export function encodeAllowanceCharges(allowanceCharges: Array<PeppolAllowanceCharge> | undefined) {
  return allowanceCharges?.map(allowanceCharge => ({
    'cbc:ChargeIndicator': allowanceCharge.chargeIndicator,
    'cbc:AllowanceChargeReasonCode': allowanceCharge.allowanceChargeReasonCode,
    'cbc:AllowanceChargeReason': allowanceCharge.allowanceChargeReason,
    'cbc:MultiplierFactorNumeric': allowanceCharge.multiplierFactorNumeric,
    'cbc:Amount': encodeAmount(allowanceCharge.amount),
    'cbc:BaseAmount': encodeAmount(allowanceCharge.baseAmount),
    'cac:TaxCategory': encodeTaxCategory(allowanceCharge.taxCategory),
  }));
}
