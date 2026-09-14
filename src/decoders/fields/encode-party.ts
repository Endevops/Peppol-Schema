import { Effect, Predicate } from 'effect';

import type { PeppolPartySchema } from '#/schemas/fields/peppol-party-base-schema.ts';

import { encodeAddress } from '#/decoders/fields/encode-address.ts';
import { encodeContact } from '#/decoders/fields/encode-contact.ts';
import { encodeIdentifier } from '#/decoders/fields/encode-identifier.ts';
import { encodePartiesTaxScheme } from '#/decoders/fields/encode-parties-tax-scheme.ts';
import { encodePartyLegalEntity } from '#/decoders/fields/encode-party-legal-entity.ts';

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
