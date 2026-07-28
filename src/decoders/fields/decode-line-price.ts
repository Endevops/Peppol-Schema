import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolLinePrice } from '#/schemas/fields/price-schema';
import type { RecursivePartial } from '#/types';

import { decodePriceAllowanceCharge } from '#/decoders/fields/decode-price-allowance-charge';
import { decodeAmount } from '#/decoders/fields/decode-amount';
import { decodeQuantity } from '#/decoders/fields/decode-quantity';
import { getProp } from '#/helpers/get-prop';

export function decodeLinePrice(price: XmlNode, ...path: Array<string>): RecursivePartial<PeppolLinePrice> | undefined {
  const node = getProp(price, ...path);
  if (!node) return undefined;

  return {
    allowanceCharge: decodePriceAllowanceCharge(node, 'cac:AllowanceCharge'),
    baseQuantity: decodeQuantity(node, 'cbc:BaseQuantity'),
    priceAmount: decodeAmount(node, 'cbc:PriceAmount'),
  };
}
