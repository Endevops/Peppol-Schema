import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export interface Identifier<T extends PeppolIdentifier['schemeId'] = string> extends PeppolIdentifier {
  schemeId?: T;
}

export const decodeIdentifier = Effect.fn(function* <const T extends PeppolIdentifier['schemeId'] = string>(
  node: XmlNode | undefined,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<Identifier<T>> | undefined> {
  const val = yield* getProp(node, ...path);
  if (!Predicate.isTruthy(val) && val !== 0) return undefined;
  const id = yield* strOrUnd(val);
  if ((Predicate.isString(val) || Predicate.isNumber(val)) && Predicate.isTruthy(id)) {
    return { id };
  }
  if (!Predicate.isTruthy(id)) return undefined;
  return {
    id,
    // @ts-expect-error I don't want to bother with the typecheck
    schemeId: yield* strOrUnd(val, '@schemeID'),
  };
});
