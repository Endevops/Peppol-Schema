import { Schema } from 'effect';

import { PeppolIdentifier } from '#/effect/fields/peppol-identifier-schema';
import { opaque } from '#/effect/utils/opaque';

export class PeppolPartyLegalEntity extends opaque<PeppolPartyLegalEntity>()(
  Schema.Struct({
    /**
     * @example
     *   987654321;
     *
     * @name cbc:CompanyID (+ @schemeID)
     */
    companyId: Schema.optional(PeppolIdentifier),
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
  })
) {}

export type PeppolPartyLegalEntitySchema = PeppolPartyLegalEntity;
