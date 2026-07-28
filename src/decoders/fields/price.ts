import type { XmlNode } from '#/helpers';
import type { PeppolLinePrice } from '#/schemas/fields/price-schema';
import type { RecursivePartial } from '#/types';

import { decodePriceAllowanceCharge, encodePriceAllowanceCharges } from '#/decoders/fields/allowance-charge';
import { decodeAmount, encodeAmount } from '#/decoders/fields/amount';
import { decodeQuantity, encodeQuantity } from '#/decoders/fields/quantity';
import { getProp } from '#/helpers';

export function decodeLinePrice(price: XmlNode, ...path: Array<string>): RecursivePartial<PeppolLinePrice> | undefined {
  const node = getProp(price, ...path);
  if (!node) return undefined;

  return {
    allowanceCharge: decodePriceAllowanceCharge(node, 'cac:AllowanceCharge'),
    baseQuantity: decodeQuantity(node, 'cbc:BaseQuantity'),
    priceAmount: decodeAmount(node, 'cbc:PriceAmount'),
  };
}

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
