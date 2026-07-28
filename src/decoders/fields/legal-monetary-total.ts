import type { XmlNode } from '#/helpers';
import type { PeppolLegalMonetaryTotal } from '#/schemas/fields/legal-monetary-total-schema';
import type { RecursivePartial } from '#/types';

import { decodeAmount, encodeAmount } from '#/decoders/fields/amount';
import { getProp } from '#/helpers';

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

export function encodeLegalMonetaryTotal(legalMonetaryTotal: PeppolLegalMonetaryTotal) {
  return {
    'cbc:LineExtensionAmount': encodeAmount(legalMonetaryTotal.lineExtensionAmount),
    'cbc:TaxExclusiveAmount': encodeAmount(legalMonetaryTotal.taxExclusiveAmount),
    'cbc:TaxInclusiveAmount': encodeAmount(legalMonetaryTotal.taxInclusiveAmount),
    'cbc:AllowanceTotalAmount': encodeAmount(legalMonetaryTotal.allowanceTotalAmount),
    'cbc:ChargeTotalAmount': encodeAmount(legalMonetaryTotal.chargeTotalAmount),
    'cbc:PrepaidAmount': encodeAmount(legalMonetaryTotal.prepaidAmount),
    'cbc:PayableRoundingAmount': encodeAmount(legalMonetaryTotal.payableRoundingAmount),
    'cbc:PayableAmount': encodeAmount(legalMonetaryTotal.payableAmount),
  };
}
