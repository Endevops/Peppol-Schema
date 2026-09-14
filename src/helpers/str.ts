import { Effect, Predicate, SchemaIssue } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { strOrUnd } from '#/helpers/str-or-und';

export const str = Effect.fn(function* (node: XmlNode, ...path: Array<string>) {
  return yield* strOrUnd(node, ...path).pipe(
    Effect.filterOrFail(
      val => Predicate.isNotNullish(val),
      () => new SchemaIssue.MissingKey({ message: `Unable to find ${path.join('->')} into ${node}` })
    ),
    Effect.filterOrFail(
      val => Predicate.isString(val),
      () => new SchemaIssue.InvalidValue({ message: `Invalid node ${path.join('->')} into ${node}` })
    )
  );
});
