import type { PeppolOrderReference } from '#/schemas/fields/order-reference-schema';

export function encodeOrderReference(orderReference: PeppolOrderReference | undefined) {
  if (!orderReference) return undefined;

  return { 'cbc:ID': orderReference.id, 'cbc:SalesOrderID': orderReference.salesOrderId };
}
