import { Effect, Predicate, SchemaIssue } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { getProp } from '#/helpers/get-prop.ts';

export const bool = Effect.fn(function* <const T extends boolean = boolean>(node: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(node, ...path).pipe(
    Effect.filterOrFail(
      val => Predicate.isNotNullish(val),
      () => new SchemaIssue.MissingKey({ message: `Unable to find ${path.join('->')} into ${node}` })
    )
  );
  if (Predicate.isBoolean(val)) return val as T;
  if (Predicate.isObject(val) && Predicate.hasProperty(val, '#text') && Predicate.isNotUndefined(val['#text'])) return val['#text'] as T;
  return yield* Effect.fail(new SchemaIssue.MissingKey({ message: `Unable to find ${path.join('->')} into ${node}` }));
});
