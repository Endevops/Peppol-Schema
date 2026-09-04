import { Schema } from 'effect';

export const contactSchema = Schema.Struct({
  /**
   * @name cbc:ElectronicMail
   */
  electronicMail: Schema.optionalKey(Schema.String),
  /**
   * @name cbc:Name
   */
  name: Schema.optionalKey(Schema.String),
  /**
   * @name cbc:Telephone
   */
  telephone: Schema.optionalKey(Schema.String),
});

export type PeppolContact = typeof contactSchema.Type;
