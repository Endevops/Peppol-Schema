import type { PeppolTaxTotal } from '#/schemas/fields/tax-totals';

import { encodeAmount } from '#/decoders/fields/encode-amount';
import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier';

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
