import { Schema } from 'effect';

import { PeppolAddress } from '#/schemas/fields/peppol-address-schema.ts';
import { PeppolPartyTaxScheme } from '#/schemas/fields/peppol-party-tax-scheme-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

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
