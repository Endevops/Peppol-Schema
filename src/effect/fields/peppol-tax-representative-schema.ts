import { Schema } from 'effect';

import { peppolAddressSchema } from './peppol-address-schema';
import { peppolPartyTaxSchemeSchema } from './peppol-party-tax-scheme-schema';

/**
 * @summary SELLER TAX REPRESENTATIVE PARTY
 *
 * @name cac:TaxRepresentativeParty
 */
export const peppolTaxRepresentativeSchema = Schema.Struct({
  /**
   * @name cac:PartyName/cbc:Name
   */
  name: Schema.String,
  /**
   * @name cac:PostalAddress
   */
  postalAddress: peppolAddressSchema,
  partyTaxScheme: peppolPartyTaxSchemeSchema,
});

export type PeppolTaxRepresentativeParty = typeof peppolTaxRepresentativeSchema.Type;
