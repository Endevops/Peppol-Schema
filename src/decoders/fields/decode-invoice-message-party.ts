import type { XmlNode } from '#/helpers/get-prop';
import type { InvoiceResponseParty } from '#/schemas/invoice-response-schema';
import type { RecursivePartial } from '#/types';

import { decodeContact } from '#/decoders/fields/decode-contact';
import { decodeElectronicAddress } from '#/decoders/fields/decode-electronic-address';
import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { decodePartyLegalEntity } from '#/decoders/fields/decode-party-legal-entity';
import { getProp } from '#/helpers/get-prop';

export function decodeInvoiceMessageParty(party: XmlNode, ...path: Array<string>): RecursivePartial<InvoiceResponseParty> | undefined {
  const val = getProp(party, ...path);
  if (!val) return undefined;
  return {
    contact: decodeContact(val, 'cac:Contact'),
    endpointId: decodeElectronicAddress(val, 'cbc:EndpointID'),
    partyIdentification: decodeIdentifier(val, 'cac:PartyIdentification', 'cbc:ID'),
    partyLegalEntity: decodePartyLegalEntity(val, 'cac:PartyLegalEntity'),
  };
}
