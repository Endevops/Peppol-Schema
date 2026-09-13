import { Schema } from 'effect';

import { PeppolAddress } from '#/effect/fields/peppol-address-schema';
import { PeppolPartyTaxScheme } from '#/effect/fields/peppol-party-tax-scheme-schema';
import { opaque } from '#/effect/utils/opaque';

/**
 * @summary SELLER TAX REPRESENTATIVE PARTY
 *
 * @name cac:TaxRepresentativeParty
 */
export class PeppolTaxRepresentative extends opaque<PeppolTaxRepresentative>()(
  Schema.Struct({
    /**
     * @name cac:PartyName/cbc:Name
     */
    name: Schema.String,
    /**
     * @name cac:PostalAddress
     */
    postalAddress: PeppolAddress,
    partyTaxScheme: PeppolPartyTaxScheme,
  })
) {}

export type PeppolTaxRepresentativeParty = PeppolTaxRepresentative;
