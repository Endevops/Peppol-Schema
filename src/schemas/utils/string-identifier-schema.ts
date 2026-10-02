import { Predicate, Schema, SchemaGetter } from 'effect';

export const StringIdentifierSchema = <
  S extends Schema.Struct<{ id: Schema.String; schemeId: Schema.optional<Scheme> }>,
  Scheme extends Schema.Constraint,
>(
  schema: S
) =>
  Schema.Union([
    schema,
    Schema.String.pipe(
      Schema.decodeTo(schema, {
        encode: SchemaGetter.forbiddenEncoding,
        decode: SchemaGetter.transform(value => (Predicate.isString(value) ? { id: value } : value)),
      })
    ),
  ]);
