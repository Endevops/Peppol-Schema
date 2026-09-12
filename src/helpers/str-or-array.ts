import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const strOrArray = Effect.fn(function* (node: XmlNode, ...path: Array<string>): Effect.fn.Return<string | Array<string> | undefined> {
  const val = yield* getProp(node, ...path);
  if (Array.isArray(val)) {
    return (yield* Effect.forEach(
      val,
      Effect.fn(function* (v: XmlNode) {
        return yield* strOrUnd(v);
      })
    )) as Array<string>;
  }

  return yield* strOrUnd(val);
});
