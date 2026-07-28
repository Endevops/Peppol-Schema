import type { PeppolLinePriceAllowanceCharge } from '#/schemas/fields/line-price-allowance-charge-schema';

import { encodeAmount } from '#/decoders/fields/encode-amount';

export function encodePriceAllowanceCharges(allowanceCharge: PeppolLinePriceAllowanceCharge | undefined) {
  if (!allowanceCharge) {
    return undefined;
  }

  return {
    'cbc:ChargeIndicator': allowanceCharge.chargeIndicator,
    'cbc:Amount': encodeAmount(allowanceCharge.amount),
    'cbc:BaseAmount': encodeAmount(allowanceCharge.baseAmount),
  };
}
