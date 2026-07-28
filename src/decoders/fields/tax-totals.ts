import type { XmlNode } from '#/helpers';
import type { PeppolTaxSubTotal } from '#/schemas/fields/tax-subtotal-schema';
import type { PeppolTaxTotal } from '#/schemas/fields/tax-totals';
import type { RecursivePartial } from '#/types';

import { decodeAmount, encodeAmount } from '#/decoders/fields/amount';
import { decodeSimpleIdentifer, encodeSimpleIdentifier } from '#/decoders/fields/id';
import { getArray, getProp, numOrUnd, strOrUnd } from '#/helpers';

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

export function encodeTaxTotals(taxTotals: Array<PeppolTaxTotal>) {
  return taxTotals.map(taxTotal => ({
    'cbc:TaxAmount': encodeAmount(taxTotal.taxAmount),
    'cac:TaxSubtotal': taxTotal.taxSubtotals?.map(taxSubTotal => ({
      'cbc:TaxableAmount': encodeAmount(taxSubTotal.taxableAmount),
      'cbc:TaxAmount': encodeAmount(taxSubTotal.taxAmount),
      'cac:TaxCategory': {
        'cbc:ID': taxSubTotal.taxCategory.id,
        'cbc:Percent': taxSubTotal.taxCategory.percent,
        'cbc:TaxExemptionReasonCode': taxSubTotal.taxCategory.taxExemptionReasonCode,
        'cbc:TaxExemptionReason': taxSubTotal.taxCategory.taxExemptionReason,
        'cac:TaxScheme': encodeSimpleIdentifier(taxSubTotal.taxCategory.taxSchemeId),
      },
    })),
  }));
}
