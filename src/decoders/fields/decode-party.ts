import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartySchema } from '#/schemas/fields/party-base-schema';
import type { RecursivePartial } from '#/types';

import { decodeAddress } from '#/decoders/fields/decode-address';
import { decodeContact } from '#/decoders/fields/decode-contact';
import { decodeElectronicAddress } from '#/decoders/fields/decode-electronic-address';
import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { decodePartiesTaxScheme } from '#/decoders/fields/decode-parties-tax-scheme';
import { decodePartyLegalEntity } from '#/decoders/fields/decode-party-legal-entity';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeParty(party: XmlNode | undefined): RecursivePartial<PeppolPartySchema> | undefined;
export function decodeParty(party: XmlNode | undefined, ...path: Array<string>): RecursivePartial<PeppolPartySchema> | undefined;
export function decodeParty(party: XmlNode | undefined, ...path: Array<string>): RecursivePartial<PeppolPartySchema> | undefined {
  const val = getProp(party, ...path);
  if (!val) return undefined;

  return {
    contact: decodeContact(val, 'cac:Contact'),
    endpointId: decodeElectronicAddress(val, 'cbc:EndpointID'),
    partyIdentification: decodeAdditionalIdentifiers(val, 'cac:PartyIdentification'),
    partyLegalEntity: decodePartyLegalEntity(val, 'cac:PartyLegalEntity'),
    partyName: decodePartyName(val, 'cac:PartyName'),
    partyTaxSchemes: decodePartiesTaxScheme(val, 'cac:PartyTaxScheme'),
    postalAddress: decodeAddress(val, 'cac:PostalAddress'),
  };
}

function decodePartyName(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolPartySchema['partyName']> | undefined {
  const partyNameNode = getProp(node, ...path);
  if (!partyNameNode) return undefined;
  return { name: strOrUnd(partyNameNode, 'cbc:Name') };
}

function decodeAdditionalIdentifiers(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolPartySchema['partyIdentification']> | undefined {
  const val = getProp(node, ...path);
  if (!val) return undefined;
  return { id: decodeIdentifier(val, 'cbc:ID') };
}
