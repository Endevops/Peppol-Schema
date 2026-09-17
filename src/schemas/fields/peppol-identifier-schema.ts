import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A generic identifier paired with an optional identification scheme identifier. Wraps a `cbc:ID` element and its optional `@schemeID` attribute, and
 * is reused across document references.
 *
 * @example
 *   ```ts
 *   { id: '99887766', schemeId: '0088' }
 *   ```;
 *
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
