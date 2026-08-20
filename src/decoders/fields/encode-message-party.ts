import type { PeppolContact } from '#/schemas/fields/contact-schema';
import type { PeppolPartyLegalEntitySchema } from '#/schemas/fields/party-legal-entity-schema';
import type { InvoiceDocumentResponseParty, InvoiceResponseParty } from '#/schemas/invoice-response-schema';
import type { PeppolMessageLevelResponseParty } from '#/schemas/message-level-response-party-schema';

import { encodeIdentifier } from '#/decoders/fields/encode-identifier';

export function encodeMessageParty(party?: PeppolMessageLevelResponseParty | InvoiceResponseParty | InvoiceDocumentResponseParty) {
  if (!party) return undefined;
  return {
    'cbc:EndpointID': 'endpointId' in party && party.endpointId ? encodeIdentifier(party.endpointId) : undefined,
    'cac:PartyIdentification':
      'partyIdentification' in party && party.partyIdentification ? { 'cbc:ID': encodeIdentifier(party.partyIdentification) } : undefined,
    'cac:PartyName': 'partyName' in party && party.partyName ? { 'cbc:Name': party.partyName.name } : undefined,
    'cac:PartyLegalEntity': 'partyLegalEntity' in party ? encodePartyLegalEntity(party.partyLegalEntity) : undefined,
    'cac:Contact': 'contact' in party ? encodeContact(party.contact) : undefined,
  };
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
