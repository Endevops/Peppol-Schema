import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolContact } from '#/schemas/fields/contact-schema';
import type { PeppolPartyLegalEntitySchema } from '#/schemas/fields/party-legal-entity-schema';
import type { InvoiceResponseParty } from '#/schemas/invoice-response-schema';
import type { RecursivePartial } from '#/types';

import { decodeElectronicAddress } from '#/decoders/fields/decode-electronic-address';
import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

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
