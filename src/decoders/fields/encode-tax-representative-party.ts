import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolTaxRepresentativeParty } from '#/schemas/fields/tax-representative-party-schema';

import { encodeAddress } from '#/decoders/fields/encode-address';
import { encodePartyTaxScheme } from '#/decoders/fields/encode-party-tax-scheme';

export const encodeTaxRepresentativeParty = Effect.fn(function* (
  taxRepresentativeParty: PeppolTaxRepresentativeParty | undefined
): Effect.fn.Return<XmlNode> {
  if (Predicate.isNullish(taxRepresentativeParty)) {
    return undefined;
  }
  return {
    'cac:PartyName': { 'cbc:Name': taxRepresentativeParty.name },
    'cac:PostalAddress': yield* encodeAddress(taxRepresentativeParty.postalAddress),
    'cac:PartyTaxScheme': yield* encodePartyTaxScheme(taxRepresentativeParty.partyTaxScheme),
  };
});
