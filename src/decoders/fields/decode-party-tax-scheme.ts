import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartyTaxSchema } from '#/schemas/fields/party-tax-schema';
import type { RecursivePartial } from '#/types';

import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodePartyTaxScheme(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolPartyTaxSchema> | undefined {
  const node = getProp(doc, ...path);
  if (!node) return undefined;

  return { companyId: strOrUnd(node, 'cbc:CompanyID'), taxSchemeId: decodeSimpleIdentifer(node, 'cac:TaxScheme') };
}
