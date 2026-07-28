import { getProp, strOrUnd } from '#/helpers';
import type { XmlNode } from '#/helpers';
import type { PeppolOrderReference } from '#/schemas/fields/order-reference-schema';
import type { RecursivePartial } from '#/types';

export function decodeOrderReference(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolOrderReference> | undefined {
  const val = getProp(node, ...path);
  if (!val) return undefined;

  return { id: strOrUnd(val, 'cbc:ID'), salesOrderId: strOrUnd(val, 'cbc:SalesOrderID') };
}

export function encodeOrderReference(orderReference: PeppolOrderReference | undefined) {
  if (!orderReference) return undefined;

  return { 'cbc:ID': orderReference.id, 'cbc:SalesOrderID': orderReference.salesOrderId };
}
