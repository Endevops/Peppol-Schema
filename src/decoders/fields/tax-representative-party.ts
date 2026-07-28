import { decodeAddress, encodeAddress } from '#/decoders/fields/address';
import { decodePartyTaxScheme, encodePartyTaxScheme } from '#/decoders/fields/party-tax-scheme';
import { getProp, strOrUnd } from '#/helpers';
import type { XmlNode } from '#/helpers';
import type { PeppolTaxRepresentativeParty } from '#/schemas/fields/tax-representative-party-schema';
import type { RecursivePartial } from '#/types';

export function decodeTaxRepresentativeParty(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolTaxRepresentativeParty> | undefined {
  const taxRepresentative = getProp(doc, ...path);
  if (!taxRepresentative) return undefined;

  return {
    name: strOrUnd(taxRepresentative, 'cac:PartyName', 'cbc:Name'),
    partyTaxScheme: decodePartyTaxScheme(taxRepresentative, 'cac:PartyTaxScheme'),
    postalAddress: decodeAddress(taxRepresentative, 'cac:PostalAddress'),
  };
}

export function encodeTaxRepresentativeParty(taxRepresentativeParty: PeppolTaxRepresentativeParty | undefined): XmlNode {
  if (!taxRepresentativeParty) {
    return undefined;
  }
  return {
    'cac:PartyName': { 'cbc:Name': taxRepresentativeParty.name },
    'cac:PostalAddress': encodeAddress(taxRepresentativeParty.postalAddress),
    'cac:PartyTaxScheme': encodePartyTaxScheme(taxRepresentativeParty.partyTaxScheme),
  };
}
