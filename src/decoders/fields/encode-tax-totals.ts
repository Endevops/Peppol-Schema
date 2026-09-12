import { Effect, Predicate } from 'effect';

import type { PeppolTaxSubTotal } from '#/schemas/fields/tax-subtotal-schema';
import type { PeppolTaxTotal } from '#/schemas/fields/tax-totals';

import { encodeAmount } from '#/decoders/fields/encode-amount';
import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier';

export const encodeTaxTotals = Effect.fn(function* (taxTotals: Array<PeppolTaxTotal>) {
  return yield* Effect.forEach(
    taxTotals,
    Effect.fn(function* (taxTotal: PeppolTaxTotal) {
      return { 'cbc:TaxAmount': yield* encodeAmount(taxTotal.taxAmount), 'cac:TaxSubtotal': yield* encodeTaxSubtotals(taxTotal.taxSubtotals) };
    })
  );
});

const encodeTaxSubtotals = Effect.fn(function* (taxSubtotals: Array<PeppolTaxSubTotal> | undefined) {
  if (Predicate.isNullish(taxSubtotals)) return undefined;

  return yield* Effect.forEach(
    taxSubtotals,
    Effect.fn(function* (taxSubTotal: PeppolTaxSubTotal) {
      return {
        'cbc:TaxableAmount': yield* encodeAmount(taxSubTotal.taxableAmount),
        'cbc:TaxAmount': yield* encodeAmount(taxSubTotal.taxAmount),
        'cac:TaxCategory': {
          'cbc:ID': taxSubTotal.taxCategory.id,
          'cbc:Percent': taxSubTotal.taxCategory.percent,
          'cbc:TaxExemptionReasonCode': taxSubTotal.taxCategory.taxExemptionReasonCode,
          'cbc:TaxExemptionReason': taxSubTotal.taxCategory.taxExemptionReason,
          'cac:TaxScheme': yield* encodeSimpleIdentifier(taxSubTotal.taxCategory.taxSchemeId),
        },
      };
    })
  );
});
