import { Effect, Predicate } from 'effect';

import type { PeppolContact } from '#/schemas/fields/peppol-contact-schema';
import type { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema';
import type { PeppolInvoiceDocumentResponseParty, PeppolInvoiceResponseParty } from '#/schemas/peppol-invoice-response-schema';
import type { PeppolMessageLevelResponseParty } from '#/schemas/peppol-message-level-response-party-schema';

import { encodeContact } from '#/decoders/fields/encode-contact';
import { encodeIdentifier } from '#/decoders/fields/encode-identifier';
import { encodePartyLegalEntity } from '#/decoders/fields/encode-party-legal-entity';

type ResponseParty = PeppolMessageLevelResponseParty | PeppolInvoiceResponseParty | PeppolInvoiceDocumentResponseParty;

/**
 * @description The response party union exposes different fields per variant; reading the optional ones through a shared view keeps the encoder branch-free.
 */
interface ResponsePartyFields {
  endpointId?: PeppolIdentifier | undefined;
  partyIdentification?: PeppolIdentifier | undefined;
  partyName?: { name: string } | undefined;
  partyLegalEntity?:
    | { registrationName?: string | undefined; companyId?: PeppolIdentifier | undefined; companyLegalForm?: string | undefined }
    | undefined;
  contact?: PeppolContact | undefined;
}

export const encodeMessageParty = Effect.fn(function* (party?: ResponseParty) {
  if (Predicate.isNullish(party)) return undefined;
  const fields = party as ResponsePartyFields;
  return {
    'cbc:EndpointID': yield* encodeIdentifier(fields.endpointId),
    'cac:PartyIdentification': fields.partyIdentification ? { 'cbc:ID': yield* encodeIdentifier(fields.partyIdentification) } : undefined,
    'cac:PartyName': fields.partyName ? { 'cbc:Name': fields.partyName.name } : undefined,
    'cac:PartyLegalEntity': fields.partyLegalEntity ? yield* encodePartyLegalEntity(fields.partyLegalEntity) : undefined,
    'cac:Contact': yield* encodeContact(fields.contact),
  };
});
