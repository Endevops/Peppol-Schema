import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolTaxSubTotal } from '#/schemas/fields/tax-subtotal-schema';
import type { PeppolTaxTotal } from '#/schemas/fields/tax-totals';
import type { RecursivePartial } from '#/types';

import { decodeAmount } from '#/decoders/fields/decode-amount';
import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { getArray } from '#/helpers/get-array';
import { getProp } from '#/helpers/get-prop';
import { numOrUnd } from '#/helpers/num-or-und';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeTaxTotals(doc: XmlNode, ...path: Array<string>): Array<RecursivePartial<PeppolTaxTotal>> | undefined {
  const arr = getArray(doc, ...path);
  if (!arr.length) return undefined;

  return arr.map(n => ({ taxAmount: decodeAmount(n, 'cbc:TaxAmount'), taxSubtotals: decodeTaxSubTotal(n, 'cac:TaxSubtotal') }));
}

function decodeTaxSubTotal(doc: XmlNode, ...path: Array<string>): Array<RecursivePartial<PeppolTaxSubTotal>> | undefined {
  const arr = getArray(doc, ...path);
  if (!arr.length) return undefined;
  return arr.map(node => ({
    taxAmount: decodeAmount(node, 'cbc:TaxAmount'),
    taxCategory: decodeTaxCategory(node, 'cac:TaxCategory'),
    taxableAmount: decodeAmount(node, 'cbc:TaxableAmount'),
  }));
}

function decodeTaxCategory(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolTaxSubTotal['taxCategory']> | undefined {
  const node = getProp(doc, ...path);
  if (!node) {
    return undefined;
  }

  return {
    id: strOrUnd(node, 'cbc:ID'),
    percent: numOrUnd(node, 'cbc:Percent'),
    taxExemptionReason: strOrUnd(node, 'cbc:TaxExemptionReason'),
    taxExemptionReasonCode: strOrUnd(node, 'cbc:TaxExemptionReasonCode'),
    taxSchemeId: decodeSimpleIdentifer(node, 'cac:TaxScheme'),
  };
}
