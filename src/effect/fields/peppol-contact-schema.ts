import { Schema } from 'effect';

export const peppolContactSchema = Schema.Struct({
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
});

export type PeppolContact = typeof peppolContactSchema.Type;
