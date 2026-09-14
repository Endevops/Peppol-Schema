import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolAmount } from '#/schemas/fields/peppol-amount-schema.ts';
import type { PeppolCurrencyCode } from '#/schemas/values/currency-code-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { getProp } from '#/helpers/get-prop.ts';

export const decodeAmount = Effect.fn(function* (
  amount: XmlNode | undefined,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolAmount> | undefined> {
  const val = yield* getProp(amount, ...path);
  if (!Predicate.isTruthy(val) && val !== 0) return undefined;
  if (Predicate.isObject(val)) {
    const raw = val as XmlNode;
    return { currencyId: String(raw['@currencyID']) as PeppolCurrencyCode, value: parseFloat(String(raw['#text'] ?? raw)) };
  }
  return { currencyId: '' as PeppolCurrencyCode, value: parseFloat(String(val)) };
});
