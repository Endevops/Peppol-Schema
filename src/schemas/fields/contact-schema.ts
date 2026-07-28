import * as z from 'zod/mini';

export const contactSchema = z.object({
  /**
   * @name cbc:ElectronicMail
   */
  electronicMail: z.optional(z.string()),
  /**
   * @name cbc:Name
   */
  name: z.optional(z.string()),
  /**
   * @name cbc:Telephone
   */
  telephone: z.optional(z.string()),
});

export type PeppolContact = z.infer<typeof contactSchema>;
