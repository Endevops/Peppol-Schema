import { Effect, Predicate } from 'effect';

import type { PeppolPartySchema } from '#/schemas/fields/party-base-schema';

import { encodeAddress } from '#/decoders/fields/encode-address';
import { encodeContact } from '#/decoders/fields/encode-contact';
import { encodeIdentifier } from '#/decoders/fields/encode-identifier';
import { encodePartiesTaxScheme } from '#/decoders/fields/encode-parties-tax-scheme';
import { encodePartyLegalEntity } from '#/decoders/fields/encode-party-legal-entity';

export const encodeParty = Effect.fn(function* (party?: PeppolPartySchema) {
  if (Predicate.isNullish(party)) return undefined;

  return {
    'cac:Party': {
      'cbc:EndpointID': yield* encodeIdentifier(party.endpointId),
      'cac:PartyIdentification': yield* encodeAdditionalIdentifiers(party.partyIdentification),
      'cac:PartyName': yield* encodePartyName(party.partyName),
      'cac:PostalAddress': yield* encodeAddress(party.postalAddress),
      'cac:PartyTaxScheme': yield* encodePartiesTaxScheme(party.partyTaxSchemes),
      'cac:PartyLegalEntity': yield* encodePartyLegalEntity(party.partyLegalEntity),
      'cac:Contact': yield* encodeContact(party.contact),
    },
  };
});

const encodePartyName = Effect.fn(function* (partyName?: PeppolPartySchema['partyName']) {
  if (Predicate.isNullish(partyName)) return undefined;
  return { 'cbc:Name': partyName.name };
});

const encodeAdditionalIdentifiers = Effect.fn(function* (identifiers: PeppolPartySchema['partyIdentification']) {
  if (Predicate.isNullish(identifiers)) return undefined;
  return { 'cbc:ID': yield* encodeIdentifier(identifiers?.id) };
});
