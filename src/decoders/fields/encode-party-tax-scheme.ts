import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartyTaxSchema } from '#/schemas/fields/party-tax-schema';

import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier';

export function encodePartyTaxScheme(partyTaxScheme: PeppolPartyTaxSchema | undefined): XmlNode {
  if (!partyTaxScheme) return undefined;

  return { 'cbc:CompanyID': partyTaxScheme.companyId, 'cac:TaxScheme': encodeSimpleIdentifier(partyTaxScheme.taxSchemeId) };
}
