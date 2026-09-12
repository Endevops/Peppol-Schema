import { Effect, Predicate } from 'effect';

import type { PeppolAllowanceCharge } from '#/schemas/fields/allowance-charge-schema';

import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier';

export const encodeTaxCategory = Effect.fn(function* (taxCategory: PeppolAllowanceCharge['taxCategory']) {
  if (Predicate.isNullish(taxCategory)) {
    return undefined;
  }
  return { 'cbc:ID': taxCategory.id, 'cbc:Percent': taxCategory.percent, 'cac:TaxScheme': yield* encodeSimpleIdentifier(taxCategory.taxSchemeId) };
});
