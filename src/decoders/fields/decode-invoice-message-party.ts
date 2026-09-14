import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { decodeContact } from '#/decoders/fields/decode-contact.ts';
import { decodeElectronicAddress } from '#/decoders/fields/decode-electronic-address.ts';
import { decodeIdentifier } from '#/decoders/fields/decode-identifier.ts';
import { decodePartyLegalEntity } from '#/decoders/fields/decode-party-legal-entity.ts';
import { getProp } from '#/helpers/get-prop.ts';

export const decodeInvoiceMessageParty = Effect.fn(function* (party: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(party, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return {
    contact: yield* decodeContact(val, 'cac:Contact'),
    endpointId: yield* decodeElectronicAddress(val, 'cbc:EndpointID'),
    partyIdentification: yield* decodeIdentifier(val, 'cac:PartyIdentification', 'cbc:ID'),
    partyLegalEntity: yield* decodePartyLegalEntity(val, 'cac:PartyLegalEntity'),
  };
});
