import type { XmlNode } from '#/helpers';
import type { PeppolPayeeParty } from '#/schemas/fields/payee-party';
import type { RecursivePartial } from '#/types';

import { decodeIdentifier, encodeIdentifier } from '#/decoders/fields/identifier';
import { getProp, strOrUnd } from '#/helpers';

export function decodePayeeParty(payee: XmlNode | undefined, ...path: Array<string>): RecursivePartial<PeppolPayeeParty> | undefined {
  const node = getProp(payee, ...path);
  if (!node) return undefined;
  return {
    partyIdentification: decodePartyIdentification(node, 'cac:PartyIdentification'),
    partyLegalEntity: decodePartyLegalEntity(node, 'cac:PartyLegalEntity'),
    partyName: decodePartyName(node, 'cac:PartyName'),
  };
}

function decodePartyLegalEntity(
  party: XmlNode | undefined,
  ...path: Array<string>
): RecursivePartial<PeppolPayeeParty['partyLegalEntity']> | undefined {
  const node = getProp(party, ...path);
  if (!node) return undefined;
  return { companyId: decodeIdentifier(node, 'cbc:CompanyID') };
}

function decodePartyName(party: XmlNode | undefined, ...path: Array<string>): RecursivePartial<PeppolPayeeParty['partyName']> | undefined {
  const node = getProp(party, ...path);
  if (!node) return undefined;
  return { name: strOrUnd(node, 'cbc:Name') };
}

function decodePartyIdentification(
  party: XmlNode | undefined,
  ...path: Array<string>
): RecursivePartial<PeppolPayeeParty['partyIdentification']> | undefined {
  const node = getProp(party, ...path);
  if (!node) return undefined;
  return { id: decodeIdentifier(node, 'cbc:ID') };
}

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
