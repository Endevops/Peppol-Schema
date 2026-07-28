import { decodeAddress, encodeAddress } from '#/decoders/fields/address';
import { decodeElectronicAddress, decodeIdentifier, encodeIdentifier } from '#/decoders/fields/identifier';
import { decodePartiesTaxScheme, encodePartiesTaxScheme } from '#/decoders/fields/party-tax-scheme';
import { getProp, strOrUnd } from '#/helpers';
import type { XmlNode } from '#/helpers';
import type { PeppolContact } from '#/schemas/fields/contact-schema';
import type { PeppolPartySchema } from '#/schemas/fields/party-base-schema';
import type { PeppolPartyLegalEntitySchema } from '#/schemas/fields/party-legal-entity-schema';
import type { InvoiceDocumentResponseParty, InvoiceResponseParty } from '#/schemas/invoice-response';
import type { PeppolMessageLevelResponseParty } from '#/schemas/message-level-response';
import type { RecursivePartial } from '#/types';

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

function encodePartyName(partyName?: PeppolPartySchema['partyName']) {
  if (!partyName) return undefined;
  return { 'cbc:Name': partyName.name };
}

export function encodeParty(party?: PeppolPartySchema) {
  if (!party) return undefined;

  return {
    'cac:Party': {
      'cbc:EndpointID': encodeIdentifier(party.endpointId),
      'cac:PartyIdentification': encodeAdditionalIdentifiers(party.partyIdentification),
      'cac:PartyName': encodePartyName(party.partyName),
      'cac:PostalAddress': encodeAddress(party.postalAddress),
      'cac:PartyTaxScheme': encodePartiesTaxScheme(party.partyTaxSchemes),
      'cac:PartyLegalEntity': encodePartyLegalEntity(party.partyLegalEntity),
      'cac:Contact': encodeContact(party.contact),
    },
  };
}

export function decodeMessageLevelParty(party: XmlNode, ...path: Array<string>): RecursivePartial<PeppolMessageLevelResponseParty> | undefined {
  const val = getProp(party, ...path);
  if (!val) return undefined;
  return { endpointId: decodeElectronicAddress(val, 'cbc:EndpointID') };
}

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

export function decodeInvoiceMessageDocumentParty(
  party: XmlNode,
  ...path: Array<string>
): RecursivePartial<InvoiceDocumentResponseParty> | undefined {
  const val = getProp(party, ...path);
  if (!val) return undefined;
  const partyName = getProp(val, 'cac:PartyName');
  return {
    partyIdentification: decodeIdentifier(val, 'cac:PartyIdentification', 'cbc:ID'),
    partyName: partyName ? { name: strOrUnd(partyName, 'cbc:Name') } : undefined,
  };
}

export function encodeMessageParty(party?: PeppolMessageLevelResponseParty | InvoiceResponseParty | InvoiceDocumentResponseParty) {
  if (!party) return undefined;
  return {
    'cbc:EndpointID': 'endpointId' in party && party.endpointId ? encodeIdentifier(party.endpointId) : undefined,
    'cac:PartyIdentification':
      'partyIdentification' in party && party.partyIdentification ? { 'cbc:ID': encodeIdentifier(party.partyIdentification) } : undefined,
    'cac:PartyName': 'partyName' in party && party.partyName ? { 'cbc:Name': party.partyName.name } : undefined,
    'cac:PartyLegalEntity': 'partyLegalEntity' in party ? encodePartyLegalEntity(party.partyLegalEntity) : undefined,
    'cac:Contact': 'contact' in party ? encodeContact(party.contact) : undefined,
  };
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

function encodeAdditionalIdentifiers(identifiers: PeppolPartySchema['partyIdentification']) {
  if (!identifiers) return undefined;
  return { 'cbc:ID': encodeIdentifier(identifiers?.id) };
}

function encodePartyLegalEntity(legalEntity: PeppolPartyLegalEntitySchema) {
  return {
    'cbc:RegistrationName': legalEntity.registrationName,
    'cbc:CompanyID': encodeIdentifier(legalEntity.companyId),
    'cbc:CompanyLegalForm': legalEntity.companyLegalForm,
  };
}

function encodeContact(contact: PeppolContact | undefined) {
  if (!contact) return undefined;

  return { 'cbc:Name': contact.name, 'cbc:Telephone': contact.telephone, 'cbc:ElectronicMail': contact.electronicMail };
}
