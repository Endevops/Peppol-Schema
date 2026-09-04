import type { InvoiceDocumentResponseParty, InvoiceResponseParty } from '#/schemas/invoice-response-schema';
import type { PeppolMessageLevelResponseParty } from '#/schemas/message-level-response-party-schema';

import { encodeContact } from '#/decoders/fields/encode-contact';
import { encodeIdentifier } from '#/decoders/fields/encode-identifier';
import { encodePartyLegalEntity } from '#/decoders/fields/encode-party-legal-entity';

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
