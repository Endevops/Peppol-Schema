import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolPartyTaxScheme } from '#/schemas/fields/peppol-party-tax-scheme-schema.ts';

import { encodePartyTaxScheme } from '#/decoders/fields/encode-party-tax-scheme.ts';

export const encodePartiesTaxScheme = Effect.fn(function* (partiesTaxScheme: Array<PeppolPartyTaxScheme> | undefined): Effect.fn.Return<XmlNode> {
  if (Predicate.isNullish(partiesTaxScheme) || partiesTaxScheme.length === 0) return undefined;

  return yield* Effect.forEach(
    partiesTaxScheme,
    Effect.fn(function* (partyTaxScheme: PeppolPartyTaxScheme) {
      return yield* encodePartyTaxScheme(partyTaxScheme);
    })
  );
});
