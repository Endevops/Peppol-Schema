import { Schema } from 'effect';

export class PeppolContact extends Schema.Opaque<PeppolContact>()(
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
