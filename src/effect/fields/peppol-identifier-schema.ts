import { Schema } from 'effect';

const peppolIdentifierBaseSchema = Schema.Struct({
  /**
   * @name cbc:ID
   */
  id: Schema.String,
  /**
   * @name `@schemeID`
   */
  schemeId: Schema.optional(Schema.String),
});

/**
 * @summary Identifier with optional scheme
 *
 * @name `cbc:ID (+ optional @schemeID)`
 */
export function peppolIdentifierSchema(error?: string) {
  return error === undefined ? peppolIdentifierBaseSchema : peppolIdentifierBaseSchema.annotate({ message: error });
}

export type PeppolIdentifier = typeof peppolIdentifierBaseSchema.Type;
