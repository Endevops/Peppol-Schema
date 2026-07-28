import type { PeppolLegalMonetaryTotal } from '#/schemas/fields/legal-monetary-total-schema';

import { encodeAmount } from '#/decoders/fields/encode-amount';

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
