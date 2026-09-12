import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { getProp } from '#/helpers/get-prop';

export const getArray = Effect.fn(function* (node: XmlNode, ...path: Array<string>): Effect.fn.Return<Array<XmlNode>> {
  if (!Predicate.isTruthy(node)) return [];
  let currentNode = node;
  for (const key of path) {
    if (!Predicate.isTruthy(currentNode)) {
      return [];
    }
    if (Array.isArray(currentNode)) {
      const flattened = yield* Effect.forEach(
        currentNode,
        Effect.fn(function* (n: XmlNode) {
          return (yield* getProp(n, key)) || [];
        })
      );
      currentNode = flattened.flat();
    } else {
      currentNode = yield* getProp(currentNode, key);
    }
  }
  if (!Predicate.isTruthy(currentNode)) {
    return [];
  }
  return Array.isArray(currentNode) ? currentNode : [currentNode];
});
