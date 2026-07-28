import type { XmlNode } from '#/helpers';
import type { PeppolQuantity } from '#/schemas/fields/quantity-schema';
import type { RecursivePartial } from '#/types';

import { getProp, numOrUnd } from '#/helpers';

export function decodeQuantity(quantity: XmlNode | undefined): RecursivePartial<PeppolQuantity> | undefined;
export function decodeQuantity(quantity: XmlNode | undefined, ...path: Array<string>): RecursivePartial<PeppolQuantity> | undefined;
export function decodeQuantity(quantity: XmlNode | undefined, ...path: Array<string>): RecursivePartial<PeppolQuantity> | undefined {
  const val = getProp(quantity, ...path);
  if (!val && val !== 0) return undefined;
  if (typeof val === 'object') {
    return { unitCode: getProp(val, '@unitCode'), value: numOrUnd(val) };
  }
  return { value: numOrUnd(val) };
}

export function encodeQuantity(quantity?: PeppolQuantity) {
  if (!quantity) return undefined;
  return { '#text': quantity.value, '@unitCode': quantity.unitCode };
}
