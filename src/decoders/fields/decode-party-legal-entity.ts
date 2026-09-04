import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartyLegalEntitySchema } from '#/schemas/fields/party-legal-entity-schema';
import type { RecursivePartial } from '#/types';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodePartyLegalEntity(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolPartyLegalEntitySchema> | undefined {
  const partyLegalEntityNode = getProp(node, ...path);
  if (!partyLegalEntityNode) return undefined;

  return {
    companyId: decodeIdentifier(partyLegalEntityNode, 'cbc:CompanyID'),
    companyLegalForm: strOrUnd(partyLegalEntityNode, 'cbc:CompanyLegalForm'),
    registrationName: strOrUnd(partyLegalEntityNode, 'cbc:RegistrationName'),
  };
}
