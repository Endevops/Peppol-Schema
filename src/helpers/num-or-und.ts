import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { strOrUnd } from '#/helpers/str-or-und.ts';

export const numOrUnd = Effect.fn(function* (node: XmlNode, ...path: Array<string>): Effect.fn.Return<number | undefined> {
  const val = yield* strOrUnd(node, ...path);

  return Predicate.isNotUndefined(val) ? parseFloat(val) : undefined;
});
