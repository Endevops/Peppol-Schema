import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { getArray } from '#/helpers/get-array.ts';

export const decodeNodeList = Effect.fn(function* <A, E, R>(
  node: XmlNode,
  decodeItem: (item: XmlNode) => Effect.Effect<A, E, R>,
  ...path: Array<string>
): Effect.fn.Return<Array<A> | undefined, E, R> {
  const arr = yield* getArray(node, ...path);
  if (arr.length === 0) return undefined;
  return yield* Effect.forEach(arr, decodeItem);
});
