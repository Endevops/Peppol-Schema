import { Effect, Predicate } from 'effect';

type Exact<TExpected, TActual extends TExpected> = keyof TExpected extends keyof TActual
  ? keyof TActual extends keyof TExpected
    ? TActual
    : never
  : never;

export const encodeSimpleIdentifier = Effect.fn(function* <const T extends { id: string } = { id: string }>(
  identifier: Exact<{ id: string }, T> | undefined
) {
  if (Predicate.isNullish(identifier)) return undefined;

  return { 'cbc:ID': identifier.id };
});
