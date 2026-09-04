import { Schema } from 'effect';

import { identifierSchema } from './identifier-schema';

export const partyLegalEntitySchema = Schema.Struct({
  /**
   * @example
   *   987654321;
   *
   * @name cbc:CompanyID (+ @schemeID)
   */
  companyId: Schema.optionalKey(identifierSchema()),
  /**
   * @example
   *   Share capital
   *
   * @name cbc:CompanyLegalForm
   */
  companyLegalForm: Schema.optionalKey(Schema.String),
  /**
   * @example
   *   Full Formal Seller Name LTD.
   *
   * @name cbc:RegistrationName
   */
  registrationName: Schema.String,
});

export type PeppolPartyLegalEntitySchema = typeof partyLegalEntitySchema.Type;
