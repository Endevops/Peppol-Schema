import { Effect, Predicate } from 'effect';

import { isDefined } from '#/helpers/is-defined';

// oxlint-disable-next-line typescript/no-explicit-any
export type XmlNode = any;

export const getProp = Effect.fn(function* (node: XmlNode, ...path: Array<string>): Effect.fn.Return<XmlNode> {
  if (!Predicate.isTruthy(node)) {
    return undefined;
  }
  if (path.length === 0) {
    return node;
  }
  let currentNode = node;
  for (const key of path) {
    const newNode = currentNode[key];
    if (isDefined(newNode)) {
      currentNode = newNode;
      continue;
    }
    if (key.includes(':')) {
      const [, localKey] = key.split(':') as [string, string, ...Array<string>];
      currentNode = currentNode[localKey];
      if (!isDefined(currentNode)) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
  return currentNode;
});
