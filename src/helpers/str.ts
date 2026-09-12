import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { PeppolNodeError } from '#/helpers/errors';
import { strOrUnd } from '#/helpers/str-or-und';

export const str = Effect.fn(function* (node: XmlNode, ...path: Array<string>): Effect.fn.Return<string, PeppolNodeError> {
  const val = yield* strOrUnd(node, ...path);
  if (Predicate.isNullish(val)) {
    return yield* new PeppolNodeError({ message: 'Invalid node' });
  }
  return val;
});
