import { Schema } from 'effect';

import { peppolIdentifierSchema } from '#/effect/fields/peppol-identifier-schema';

export const peppolPartyLegalEntitySchema = Schema.Struct({
  /**
   * @example
   *   987654321;
   *
   * @name cbc:CompanyID (+ @schemeID)
   */
  companyId: Schema.optional(peppolIdentifierSchema()),
  /**
   * @example
   *   Share capital
   *
   * @name cbc:CompanyLegalForm
   */
  companyLegalForm: Schema.optional(Schema.String),
  /**
   * @example
   *   Full Formal Seller Name LTD.
   *
   * @name cbc:RegistrationName
   */
  registrationName: Schema.String,
});

export type PeppolPartyLegalEntitySchema = typeof peppolPartyLegalEntitySchema.Type;
