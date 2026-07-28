import * as z from 'zod/mini';

import { identifierSchema } from '#/schemas/fields/identifier-schema';

export const partyLegalEntitySchema = z.object({
  /**
   * @example
   *   987654321;
   *
   * @name cbc:CompanyID (+ @schemeID)
   */
  companyId: z.optional(identifierSchema()),
  /**
   * @example
   *   Share capital
   *
   * @name cbc:CompanyLegalForm
   */
  companyLegalForm: z.optional(z.string()),
  /**
   * @example
   *   Full Formal Seller Name LTD.
   *
   * @name cbc:RegistrationName
   */
  registrationName: z.string(),
});

export type PeppolPartyLegalEntitySchema = z.infer<typeof partyLegalEntitySchema>;
