import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartyTaxSchema } from '#/schemas/fields/party-tax-schema';

import { encodePartyTaxScheme } from '#/decoders/fields/encode-party-tax-scheme';

export const encodePartiesTaxScheme = Effect.fn(function* (partiesTaxScheme: Array<PeppolPartyTaxSchema> | undefined): Effect.fn.Return<XmlNode> {
  if (Predicate.isNullish(partiesTaxScheme) || partiesTaxScheme.length === 0) return undefined;

  return yield* Effect.forEach(
    partiesTaxScheme,
    Effect.fn(function* (partyTaxScheme: PeppolPartyTaxSchema) {
      return yield* encodePartyTaxScheme(partyTaxScheme);
    })
  );
});
