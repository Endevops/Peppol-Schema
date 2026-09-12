import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartyTaxSchema } from '#/schemas/fields/party-tax-schema';
import type { RecursivePartial } from '#/types';

import { decodePartyTaxScheme } from '#/decoders/fields/decode-party-tax-scheme';
import { getArray } from '#/helpers/get-array';

export const decodePartiesTaxScheme = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<Array<PeppolPartyTaxSchema>> | undefined> {
  const node = yield* getArray(doc, ...path);
  if (node.length === 0) return undefined;

  const values = yield* Effect.forEach(
    node,
    Effect.fn(function* (n: XmlNode) {
      return yield* decodePartyTaxScheme(n);
    })
  );
  return values.filter(Predicate.isNotNullish);
});
