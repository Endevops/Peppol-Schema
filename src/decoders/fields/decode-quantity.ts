import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolQuantity } from '#/schemas/fields/quantity-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { numOrUnd } from '#/helpers/num-or-und';

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
