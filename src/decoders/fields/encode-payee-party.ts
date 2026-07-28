import type { PeppolPayeeParty } from '#/schemas/fields/payee-party';

import { encodeIdentifier } from '#/decoders/fields/encode-identifier';

export function encodePayeeParty(payeeParty: PeppolPayeeParty | undefined) {
  if (!payeeParty) return undefined;
  return {
    'cac:PartyIdentification': encodePartyIdentification(payeeParty.partyIdentification),
    'cac:PartyName': encodePartyName(payeeParty.partyName),
    'cac:PartyLegalEntity': encodePartyLegalEntity(payeeParty.partyLegalEntity),
  };
}

function encodePartyName(partyName: PeppolPayeeParty['partyName']) {
  return { 'cbc:Name': partyName.name };
}

function encodePartyLegalEntity(partyLegalEntity: PeppolPayeeParty['partyLegalEntity']) {
  if (!partyLegalEntity) return undefined;
  return { 'cbc:CompanyId': partyLegalEntity?.companyId ? encodeIdentifier(partyLegalEntity?.companyId) : undefined };
}

function encodePartyIdentification(partyIdentification: PeppolPayeeParty['partyIdentification']) {
  if (!partyIdentification) return undefined;
  return { 'cbc:ID': partyIdentification.id ? encodeIdentifier(partyIdentification.id) : undefined };
}
