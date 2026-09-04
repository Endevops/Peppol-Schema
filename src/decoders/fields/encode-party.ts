import type { PeppolPartySchema } from '#/schemas/fields/party-base-schema';

import { encodeAddress } from '#/decoders/fields/encode-address';
import { encodeContact } from '#/decoders/fields/encode-contact';
import { encodeIdentifier } from '#/decoders/fields/encode-identifier';
import { encodePartiesTaxScheme } from '#/decoders/fields/encode-parties-tax-scheme';
import { encodePartyLegalEntity } from '#/decoders/fields/encode-party-legal-entity';

export function encodeParty(party?: PeppolPartySchema) {
  if (!party) return undefined;

  return {
    'cac:Party': {
      'cbc:EndpointID': encodeIdentifier(party.endpointId),
      'cac:PartyIdentification': encodeAdditionalIdentifiers(party.partyIdentification),
      'cac:PartyName': encodePartyName(party.partyName),
      'cac:PostalAddress': encodeAddress(party.postalAddress),
      'cac:PartyTaxScheme': encodePartiesTaxScheme(party.partyTaxSchemes),
      'cac:PartyLegalEntity': encodePartyLegalEntity(party.partyLegalEntity),
      'cac:Contact': encodeContact(party.contact),
    },
  };
}

function encodePartyName(partyName?: PeppolPartySchema['partyName']) {
  if (!partyName) return undefined;
  return { 'cbc:Name': partyName.name };
}

function encodeAdditionalIdentifiers(identifiers: PeppolPartySchema['partyIdentification']) {
  if (!identifiers) return undefined;
  return { 'cbc:ID': encodeIdentifier(identifiers?.id) };
}
