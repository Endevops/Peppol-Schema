import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolTaxRepresentativeParty } from '#/schemas/fields/tax-representative-party-schema';
import type { RecursivePartial } from '#/types';

import { decodeAddress } from '#/decoders/fields/decode-address';
import { decodePartyTaxScheme } from '#/decoders/fields/decode-party-tax-scheme';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeTaxRepresentativeParty(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolTaxRepresentativeParty> | undefined {
  const taxRepresentative = getProp(doc, ...path);
  if (!taxRepresentative) return undefined;

  return {
    name: strOrUnd(taxRepresentative, 'cac:PartyName', 'cbc:Name'),
    partyTaxScheme: decodePartyTaxScheme(taxRepresentative, 'cac:PartyTaxScheme'),
    postalAddress: decodeAddress(taxRepresentative, 'cac:PostalAddress'),
  };
}
