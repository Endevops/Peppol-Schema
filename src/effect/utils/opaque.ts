import type { Schema } from 'effect';

/**
 * @description Nominal type produced by {@link opaque}. Equivalent to the type returned by `Schema.Opaque<Self>()(schema)`. Declaring the intersection once behind
 * a named type keeps declaration emit compact: the wrapped struct is referenced a single time instead of being expanded in both `Schema.Opaque` and
 * `Omit`.
 */
export type OpaqueSchema<Self, S extends Schema.Top> = Schema.Opaque<Self, S, {}> & Omit<S, keyof Schema.Top>;

/**
 * @description Lightweight replacement for `Schema.Opaque<Self>()` that produces the same runtime value and type with a smaller declaration footprint.
 *
 * @param Self - The nominal type the decoded value should be branded as.
 *
 * @returns A function that wraps a struct schema into an opaque schema typed as {@link OpaqueSchema}.
 */
export function opaque<Self>() {
  return <S extends Schema.Top>(schema: S): OpaqueSchema<Self, S> => schema as unknown as OpaqueSchema<Self, S>;
}
