import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque';

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
