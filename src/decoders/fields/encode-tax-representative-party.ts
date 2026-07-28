import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolTaxRepresentativeParty } from '#/schemas/fields/tax-representative-party-schema';

import { encodeAddress } from '#/decoders/fields/encode-address';
import { encodePartyTaxScheme } from '#/decoders/fields/encode-party-tax-scheme';

export function encodeTaxRepresentativeParty(taxRepresentativeParty: PeppolTaxRepresentativeParty | undefined): XmlNode {
  if (!taxRepresentativeParty) {
    return undefined;
  }
  return {
    'cac:PartyName': { 'cbc:Name': taxRepresentativeParty.name },
    'cac:PostalAddress': encodeAddress(taxRepresentativeParty.postalAddress),
    'cac:PartyTaxScheme': encodePartyTaxScheme(taxRepresentativeParty.partyTaxScheme),
  };
}
