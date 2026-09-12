import { Effect, Predicate } from 'effect';

import type { InvoiceDocumentResponseParty, InvoiceResponseParty } from '#/schemas/invoice-response-schema';
import type { PeppolMessageLevelResponseParty } from '#/schemas/message-level-response-party-schema';

import { encodeContact } from '#/decoders/fields/encode-contact';
import { encodeIdentifier } from '#/decoders/fields/encode-identifier';
import { encodePartyLegalEntity } from '#/decoders/fields/encode-party-legal-entity';

export const encodeMessageParty = Effect.fn(function* (
  party?: PeppolMessageLevelResponseParty | InvoiceResponseParty | InvoiceDocumentResponseParty
) {
  if (Predicate.isNullish(party)) return undefined;
  return {
    'cbc:EndpointID': 'endpointId' in party && Predicate.isNotNullish(party.endpointId) ? yield* encodeIdentifier(party.endpointId) : undefined,
    'cac:PartyIdentification':
      'partyIdentification' in party && Predicate.isNotNullish(party.partyIdentification)
        ? { 'cbc:ID': yield* encodeIdentifier(party.partyIdentification) }
        : undefined,
    'cac:PartyName': 'partyName' in party && Predicate.isNotNullish(party.partyName) ? { 'cbc:Name': party.partyName.name } : undefined,
    'cac:PartyLegalEntity': 'partyLegalEntity' in party ? yield* encodePartyLegalEntity(party.partyLegalEntity) : undefined,
    'cac:Contact': 'contact' in party ? yield* encodeContact(party.contact) : undefined,
  };
});
