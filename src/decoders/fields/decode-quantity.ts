import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolQuantity } from '#/schemas/fields/quantity-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { numOrUnd } from '#/helpers/num-or-und';

export const decodeQuantity = Effect.fn(function* (
  quantity: XmlNode | undefined,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolQuantity> | undefined> {
  const val = yield* getProp(quantity, ...path);
  if (!Predicate.isTruthy(val) && val !== 0) return undefined;
  if (Predicate.isObject(val)) {
    return { unitCode: yield* getProp(val, '@unitCode'), value: yield* numOrUnd(val) };
  }
  return { value: yield* numOrUnd(val) };
});
