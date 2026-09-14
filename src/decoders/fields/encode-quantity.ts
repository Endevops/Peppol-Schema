import { Effect, Predicate } from 'effect';

import type { PeppolQuantity } from '#/schemas/fields/peppol-quantity-schema.ts';

export const encodeQuantity = Effect.fn(function* (quantity?: PeppolQuantity) {
  if (Predicate.isNullish(quantity)) return undefined;
  return { '#text': quantity.value, '@unitCode': quantity.unitCode };
});
