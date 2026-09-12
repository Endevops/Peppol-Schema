import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { getProp } from '#/helpers/get-prop';
import { isDefined } from '#/helpers/is-defined';

export const strOrUnd = Effect.fn(function* <const T extends string = string>(
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<T | undefined> {
  const val = yield* getProp(node, ...path);
  if (!isDefined(val)) return undefined;
  if (!Predicate.isObject(val)) return val.toString();
  const raw = val as XmlNode;
  if (Predicate.isUndefined(raw['#text'])) return undefined;
  return raw['#text'].toString();
});
