import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolLegalMonetaryTotal } from '#/schemas/fields/legal-monetary-total-schema';
import type { RecursivePartial } from '#/types';

import { decodeAmount } from '#/decoders/fields/decode-amount';
import { getProp } from '#/helpers/get-prop';

export function decodeLegalMonetaryTotal(node: XmlNode | undefined, ...path: Array<string>): RecursivePartial<PeppolLegalMonetaryTotal> | undefined {
  const val = getProp(node, ...path);
  if (!val) return undefined;

  return {
    allowanceTotalAmount: decodeAmount(val, 'cbc:AllowanceTotalAmount'),
    chargeTotalAmount: decodeAmount(val, 'cbc:ChargeTotalAmount'),
    lineExtensionAmount: decodeAmount(val, 'cbc:LineExtensionAmount'),
    payableAmount: decodeAmount(val, 'cbc:PayableAmount'),
    payableRoundingAmount: decodeAmount(val, 'cbc:PayableRoundingAmount'),
    prepaidAmount: decodeAmount(val, 'cbc:PrepaidAmount'),
    taxExclusiveAmount: decodeAmount(val, 'cbc:TaxExclusiveAmount'),
    taxInclusiveAmount: decodeAmount(val, 'cbc:TaxInclusiveAmount'),
  };
}
