import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeSimpleIdentifer = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<{ id: string }> | undefined> {
  const node = yield* getProp(doc, ...path);
  if (Predicate.isNullish(node)) return undefined;

  return { id: yield* strOrUnd(node, 'cbc:ID') };
});
