import { Effect, Predicate } from 'effect';

import type { PeppolAmount } from '#/schemas/fields/amount-schema';

export const encodeAmount = Effect.fn(function* (amount?: PeppolAmount) {
  if (Predicate.isNullish(amount)) return undefined;
  return { '#text': amount.value, '@currencyID': amount.currencyId };
});
