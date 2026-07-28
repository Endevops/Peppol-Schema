import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartyTaxSchema } from '#/schemas/fields/party-tax-schema';

import { encodePartyTaxScheme } from '#/decoders/fields/encode-party-tax-scheme';

export function encodePartiesTaxScheme(partiesTaxScheme: Array<PeppolPartyTaxSchema> | undefined): XmlNode {
  if (!partiesTaxScheme?.length) return undefined;

  return partiesTaxScheme.map(partyTaxScheme => encodePartyTaxScheme(partyTaxScheme));
}
