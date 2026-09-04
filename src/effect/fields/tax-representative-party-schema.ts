import { Schema } from 'effect';

import { addressSchema } from './address-schema';
import { partyTaxSchemeSchema } from './party-tax-schema';

/**
 * @summary SELLER TAX REPRESENTATIVE PARTY
 *
 * @name cac:TaxRepresentativeParty
 */
export const taxRepresentativeSchema = Schema.Struct({
  /**
   * @name cac:PartyName/cbc:Name
   */
  name: Schema.String,
  /**
   * @name cac:PostalAddress
   */
  postalAddress: addressSchema,
  partyTaxScheme: partyTaxSchemeSchema,
});

export type PeppolTaxRepresentativeParty = typeof taxRepresentativeSchema.Type;
