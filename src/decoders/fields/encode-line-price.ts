import type { PeppolLinePrice } from '#/schemas/fields/price-schema';

import { encodePriceAllowanceCharges } from '#/decoders/fields/encode-price-allowance-charges';
import { encodeAmount } from '#/decoders/fields/encode-amount';
import { encodeQuantity } from '#/decoders/fields/encode-quantity';

export function encodeLinePrice(price: PeppolLinePrice | undefined) {
  if (!price) {
    return undefined;
  }
  return {
    'cbc:PriceAmount': encodeAmount(price.priceAmount),
    'cbc:BaseQuantity': encodeQuantity(price.baseQuantity),
    'cac:AllowanceCharge': encodePriceAllowanceCharges(price.allowanceCharge),
  };
}
