import type { PeppolQuantity } from '#/schemas/fields/quantity-schema';

export function encodeQuantity(quantity?: PeppolQuantity) {
  if (!quantity) return undefined;
  return { '#text': quantity.value, '@unitCode': quantity.unitCode };
}
