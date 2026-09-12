import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { PeppolNodeError } from '#/helpers/errors';
import { getProp } from '#/helpers/get-prop';
import { isDefined } from '#/helpers/is-defined';

export const bool = Effect.fn(function* <const T extends boolean = boolean>(
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<T, PeppolNodeError> {
  const val = yield* getProp(node, ...path);
  if (!isDefined(val)) {
    return yield* new PeppolNodeError({ message: `Unable to find ${path.join('->')} into ${node}` });
  }
  if (Predicate.isBoolean(val)) return val as T;
  if (Predicate.isObject(val) && Predicate.hasProperty(val, '#text') && Predicate.isNotUndefined(val['#text'])) return val['#text'] as T;
  return yield* new PeppolNodeError({ message: `Unable to find ${path.join('->')} into ${node}` });
});
