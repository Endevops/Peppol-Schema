import { Effect, Predicate } from 'effect';

import type { PeppolOrderReference } from '#/schemas/fields/peppol-order-reference-schema.ts';

export const encodeOrderReference = Effect.fn(function* (orderReference: PeppolOrderReference | undefined) {
  if (Predicate.isNullish(orderReference)) return undefined;

  return { 'cbc:ID': orderReference.id, 'cbc:SalesOrderID': orderReference.salesOrderId };
});
