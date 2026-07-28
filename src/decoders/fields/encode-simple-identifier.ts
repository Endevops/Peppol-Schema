type Exact<TExpected, TActual extends TExpected> = keyof TExpected extends keyof TActual
  ? keyof TActual extends keyof TExpected
    ? TActual
    : never
  : never;

export function encodeSimpleIdentifier<const T extends { id: string } = { id: string }>(identifier: Exact<{ id: string }, T> | undefined) {
  if (!identifier) return undefined;

  return { 'cbc:ID': identifier.id };
}
