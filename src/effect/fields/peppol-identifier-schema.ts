import { Schema } from 'effect';

/**
 * @summary Identifier with optional scheme
 *
 * @name `cbc:ID (+ optional @schemeID)`
 */
export class PeppolIdentifier extends Schema.Opaque<PeppolIdentifier>()(
  Schema.Struct({
    /**
     * @name cbc:ID
     */
    id: Schema.String,
    /**
     * @name `@schemeID`
     */
    schemeId: Schema.optional(Schema.String),
  })
) {}
