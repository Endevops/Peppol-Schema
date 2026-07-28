import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPayeeParty } from '#/schemas/fields/payee-party';
import type { RecursivePartial } from '#/types';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

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
