import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartyTaxSchema } from '#/schemas/fields/party-tax-schema';
import type { RecursivePartial } from '#/types';

import { getArray } from '#/helpers/get-array';

import { decodePartyTaxScheme } from '#/decoders/fields/decode-party-tax-scheme';

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
