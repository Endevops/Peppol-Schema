import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolAllowanceCharge } from '#/schemas/fields/allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { getProp } from '#/helpers/get-prop';
import { numOrUnd } from '#/helpers/num-or-und';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeTaxCategory(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolAllowanceCharge['taxCategory']> | undefined {
  const taxCategory = getProp(doc, ...path);
  if (!taxCategory) {
    return undefined;
  }

  return {
    id: strOrUnd(taxCategory, 'cbc:ID'),
    percent: numOrUnd(taxCategory, 'cbc:Percent'),
    taxSchemeId: decodeSimpleIdentifer(taxCategory, 'cac:TaxScheme'),
  };
}
