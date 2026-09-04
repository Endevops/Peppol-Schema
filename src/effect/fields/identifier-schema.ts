import { Schema } from 'effect';

const identifierBase = Schema.Struct({
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
export function identifierSchema(error?: string) {
  return error === undefined ? identifierBase : identifierBase.annotate({ message: error });
}

export type PeppolIdentifier = typeof identifierBase.Type;
