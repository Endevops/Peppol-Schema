import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolPartyTaxSchema } from '#/schemas/fields/peppol-party-tax-scheme-schema.ts';

import { encodePartyTaxScheme } from '#/decoders/fields/encode-party-tax-scheme.ts';

export const encodePartiesTaxScheme = Effect.fn(function* (partiesTaxScheme: Array<PeppolPartyTaxSchema> | undefined): Effect.fn.Return<XmlNode> {
  if (Predicate.isNullish(partiesTaxScheme) || partiesTaxScheme.length === 0) return undefined;

  return yield* Effect.forEach(
    partiesTaxScheme,
    Effect.fn(function* (partyTaxScheme: PeppolPartyTaxSchema) {
      return yield* encodePartyTaxScheme(partyTaxScheme);
    })
  );
});
