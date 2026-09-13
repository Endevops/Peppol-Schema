import { Schema } from 'effect';

import { opaque } from '#/effect/utils/opaque';

/**
 * @summary Identifier with optional scheme
 *
 * @name `cbc:ID (+ optional @schemeID)`
 */
export class PeppolIdentifier extends opaque<PeppolIdentifier>()(
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
