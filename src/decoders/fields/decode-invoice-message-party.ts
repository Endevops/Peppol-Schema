import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { InvoiceResponseParty } from '#/schemas/invoice-response-schema';
import type { RecursivePartial } from '#/types';

import { decodeContact } from '#/decoders/fields/decode-contact';
import { decodeElectronicAddress } from '#/decoders/fields/decode-electronic-address';
import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { decodePartyLegalEntity } from '#/decoders/fields/decode-party-legal-entity';
import { getProp } from '#/helpers/get-prop';

export const decodeInvoiceMessageParty = Effect.fn(function* (
  party: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<InvoiceResponseParty> | undefined> {
  const val = yield* getProp(party, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return {
    contact: yield* decodeContact(val, 'cac:Contact'),
    endpointId: yield* decodeElectronicAddress(val, 'cbc:EndpointID'),
    partyIdentification: yield* decodeIdentifier(val, 'cac:PartyIdentification', 'cbc:ID'),
    partyLegalEntity: yield* decodePartyLegalEntity(val, 'cac:PartyLegalEntity'),
  };
});
