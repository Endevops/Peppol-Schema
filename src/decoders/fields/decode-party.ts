import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolContact } from '#/schemas/fields/contact-schema';
import type { PeppolPartySchema } from '#/schemas/fields/party-base-schema';
import type { PeppolPartyLegalEntitySchema } from '#/schemas/fields/party-legal-entity-schema';
import type { RecursivePartial } from '#/types';

import { decodeAddress } from '#/decoders/fields/decode-address';
import { decodeElectronicAddress } from '#/decoders/fields/decode-electronic-address';
import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { decodePartiesTaxScheme } from '#/decoders/fields/decode-parties-tax-scheme';
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

function decodePartyLegalEntity(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolPartyLegalEntitySchema> | undefined {
  const partyLegalEntityNode = getProp(node, ...path);
  if (!partyLegalEntityNode) return undefined;

  return {
    companyId: decodeIdentifier(partyLegalEntityNode, 'cbc:CompanyID'),
    companyLegalForm: strOrUnd(partyLegalEntityNode, 'cbc:CompanyLegalForm'),
    registrationName: strOrUnd(partyLegalEntityNode, 'cbc:RegistrationName'),
  };
}

function decodeContact(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolContact> | undefined {
  const contactNode = getProp(node, ...path);
  if (!contactNode) return undefined;

  return {
    electronicMail: strOrUnd(contactNode, 'cbc:ElectronicMail'),
    name: strOrUnd(contactNode, 'cbc:Name'),
    telephone: strOrUnd(contactNode, 'cbc:Telephone'),
  };
}
