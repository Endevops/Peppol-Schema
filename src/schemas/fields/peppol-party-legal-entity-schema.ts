import { Schema } from 'effect';

import { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description The legal entity details of a party, including the registered name and optional company identifiers.
 *
 * @example
 *   ```ts
 *   { registrationName: 'SupplierOfficialName Ltd', companyId: { id: 'GB983294' } }
 *   ```;
 *
 * @see {@link PeppolPartySchema}
 */
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

/**
 * @description Alias for {@link PeppolPartyLegalEntity}.
 */
export type PeppolPartyLegalEntitySchema = PeppolPartyLegalEntity;
