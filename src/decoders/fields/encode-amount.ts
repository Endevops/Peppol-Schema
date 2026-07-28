import type { PeppolAmount } from '#/schemas/fields/amount-schema';

export function encodeAmount(amount?: PeppolAmount) {
  if (!amount) return undefined;
  return { '#text': amount.value, '@currencyID': amount.currencyId };
}
