import { Effect } from 'effect';

import type { PeppolLegalMonetaryTotal } from '#/schemas/fields/legal-monetary-total-schema';

import { encodeAmount } from '#/decoders/fields/encode-amount';

export const encodeLegalMonetaryTotal = Effect.fn(function* (legalMonetaryTotal: PeppolLegalMonetaryTotal) {
  return {
    'cbc:LineExtensionAmount': yield* encodeAmount(legalMonetaryTotal.lineExtensionAmount),
    'cbc:TaxExclusiveAmount': yield* encodeAmount(legalMonetaryTotal.taxExclusiveAmount),
    'cbc:TaxInclusiveAmount': yield* encodeAmount(legalMonetaryTotal.taxInclusiveAmount),
    'cbc:AllowanceTotalAmount': yield* encodeAmount(legalMonetaryTotal.allowanceTotalAmount),
    'cbc:ChargeTotalAmount': yield* encodeAmount(legalMonetaryTotal.chargeTotalAmount),
    'cbc:PrepaidAmount': yield* encodeAmount(legalMonetaryTotal.prepaidAmount),
    'cbc:PayableRoundingAmount': yield* encodeAmount(legalMonetaryTotal.payableRoundingAmount),
    'cbc:PayableAmount': yield* encodeAmount(legalMonetaryTotal.payableAmount),
  };
});
