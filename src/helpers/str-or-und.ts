import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { getProp } from '#/helpers/get-prop.ts';

export const strOrUnd = Effect.fn('str-or-und')(function* <const T extends string = string>(
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<T | undefined> {
  const val = yield* getProp(node, ...path);
  if (Predicate.isNullish(val)) return undefined;
  if (!Predicate.isObject(val)) return (val as { toString(): T }).toString();
  const raw = val as XmlNode;
  if (Predicate.isUndefined(raw['#text'])) return undefined;
  return raw['#text'].toString();
});
