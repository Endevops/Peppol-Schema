import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { RecursivePartial } from '#/types.ts';

import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodeSimpleIdentifer = Effect.fn('decode-simple-identifier')(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<{ id: string }> | undefined> {
  const node = yield* getProp(doc, ...path);
  if (Predicate.isNullish(node)) return undefined;

  return { id: yield* strOrUnd(node, 'cbc:ID') };
});
