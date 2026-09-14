import type { Schema, SchemaAST } from 'effect';

import { TestSchema } from 'effect/testing';

/**
 * @description `TestSchema.Asserts(schema).decoding()` with plain expected values. A schema's decoded `Type` is nominal: the code-list value schemas are branded,
 * so `expected` would have to be built with `Schema.brand` values even though the decoded runtime value is a plain string or object. Tests assert on
 * the plain shape, so this accepts the unbranded expectation and casts it once, here. Use this only in tests. Production schemas keep their brands.
 */
export const decoding = <S extends Schema.Constraint>(schema: S, options?: { readonly parseOptions?: SchemaAST.ParseOptions | undefined }) => {
  const base = new TestSchema.Asserts(schema).decoding(options);
  const succeed = (base.succeed as unknown as (input: unknown, expected?: unknown) => Promise<void>).bind(base);
  const fail = (base.fail as unknown as (input: unknown, message: string) => Promise<void>).bind(base);

  return {
    fail: (input: unknown, message: string) => fail(input, message),
    succeed: (input: unknown, expected?: unknown) => (expected === undefined ? succeed(input) : succeed(input, expected)),
  };
};
