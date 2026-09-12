import { Schema } from 'effect';

/**
 * @summary Identifier with optional scheme
 *
 * @name `cbc:ID (+ optional @schemeID)`
 */
export const peppolIdentifierSchema = Schema.Struct({
  /**
   * @name cbc:ID
   */
  id: Schema.String,
  /**
   * @name `@schemeID`
   */
  schemeId: Schema.optional(Schema.String),
});

export type PeppolIdentifier = typeof peppolIdentifierSchema.Type;
