import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolOrderReference } from '#/schemas/fields/order-reference-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeOrderReference(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolOrderReference> | undefined {
  const val = getProp(node, ...path);
  if (!val) return undefined;

  return { id: strOrUnd(val, 'cbc:ID'), salesOrderId: strOrUnd(val, 'cbc:SalesOrderID') };
}
