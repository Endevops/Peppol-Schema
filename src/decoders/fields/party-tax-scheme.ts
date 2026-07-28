import type { XmlNode } from '#/helpers';
import type { PeppolPartyTaxSchema } from '#/schemas/fields/party-tax-schema';
import type { RecursivePartial } from '#/types';

import { decodeSimpleIdentifer, encodeSimpleIdentifier } from '#/decoders/fields/id';
import { getArray, getProp, strOrUnd } from '#/helpers';

export function decodePartiesTaxScheme(doc: XmlNode, ...path: Array<string>): RecursivePartial<Array<PeppolPartyTaxSchema>> | undefined {
  const node = getArray(doc, ...path);
  if (!node?.length) return undefined;

  return node.reduce((prev, n) => {
    const val = decodePartyTaxScheme(n);
    if (val) {
      prev.push(val);
    }
    return prev;
  }, []);
}
export function decodePartyTaxScheme(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolPartyTaxSchema> | undefined {
  const node = getProp(doc, ...path);
  if (!node) return undefined;

  return { companyId: strOrUnd(node, 'cbc:CompanyID'), taxSchemeId: decodeSimpleIdentifer(node, 'cac:TaxScheme') };
}

export function encodePartiesTaxScheme(partiesTaxScheme: Array<PeppolPartyTaxSchema> | undefined): XmlNode {
  if (!partiesTaxScheme?.length) return undefined;

  return partiesTaxScheme.map(partyTaxScheme => encodePartyTaxScheme(partyTaxScheme));
}

export function encodePartyTaxScheme(partyTaxScheme: PeppolPartyTaxSchema | undefined): XmlNode {
  if (!partyTaxScheme) return undefined;

  return { 'cbc:CompanyID': partyTaxScheme.companyId, 'cac:TaxScheme': encodeSimpleIdentifier(partyTaxScheme.taxSchemeId) };
}
