import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolOrderReference } from '#/schemas/fields/peppol-order-reference-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodeOrderReference = Effect.fn(function* (
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolOrderReference> | undefined> {
  const val = yield* getProp(node, ...path);
  if (Predicate.isNullish(val)) return undefined;

  return { id: yield* strOrUnd(val, 'cbc:ID'), salesOrderId: yield* strOrUnd(val, 'cbc:SalesOrderID') };
});
