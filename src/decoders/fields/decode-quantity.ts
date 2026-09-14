import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { getProp } from '#/helpers/get-prop.ts';
import { numOrUnd } from '#/helpers/num-or-und.ts';

export const decodeQuantity = Effect.fn(function* (quantity: XmlNode | undefined, ...path: Array<string>) {
  const val = yield* getProp(quantity, ...path);
  if (!Predicate.isTruthy(val) && val !== 0) return undefined;
  if (Predicate.isObject(val)) {
    return { unitCode: yield* getProp(val, '@unitCode'), value: yield* numOrUnd(val) };
  }
  return { value: yield* numOrUnd(val) };
});
