import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolTaxRepresentativeParty } from '#/schemas/fields/peppol-tax-representative-schema.ts';

import { encodeAddress } from '#/decoders/fields/encode-address.ts';
import { encodePartyTaxScheme } from '#/decoders/fields/encode-party-tax-scheme.ts';

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
