import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolContact } from '#/schemas/fields/contact-schema';
import type { PeppolPartySchema } from '#/schemas/fields/party-base-schema';
import type { PeppolPartyLegalEntitySchema } from '#/schemas/fields/party-legal-entity-schema';

import { encodeAddress } from '#/decoders/fields/encode-address';
import { encodeIdentifier } from '#/decoders/fields/encode-identifier';
import { encodePartiesTaxScheme } from '#/decoders/fields/encode-parties-tax-scheme';

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

function encodePartyLegalEntity(legalEntity: PeppolPartyLegalEntitySchema) {
  return {
    'cbc:RegistrationName': legalEntity.registrationName,
    'cbc:CompanyID': encodeIdentifier(legalEntity.companyId),
    'cbc:CompanyLegalForm': legalEntity.companyLegalForm,
  };
}

function encodeContact(contact: PeppolContact | undefined) {
  if (!contact) return undefined;

  return { 'cbc:Name': contact.name, 'cbc:Telephone': contact.telephone, 'cbc:ElectronicMail': contact.electronicMail };
}
