import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A contact point for a party, such as the person responsible for receiving the Invoice. Wraps the `cac:Contact` element with an optional name,
 * telephone number and electronic mail address.
 *
 * @example
 *   ```ts
 *   { name: 'Lisa Johnson', telephone: '23434234', electronicMail: 'lj@buyer.se' }
 *   ```;
 *
 * @see {@link PeppolPartySchema}
 */
export class PeppolContact extends opaque<PeppolContact>()(
  Schema.Struct({
    /**
     * @name cbc:ElectronicMail
     */
    electronicMail: Schema.optional(Schema.String),
    /**
     * @name cbc:Name
     */
    name: Schema.optional(Schema.String),
    /**
     * @name cbc:Telephone
     */
    telephone: Schema.optional(Schema.String),
  })
) {}
