import { Effect, Predicate } from 'effect';

import type { PeppolIdentifier } from '#/schemas/fields/identifier-schema';

export const encodeIdentifier = Effect.fn(function* (id?: PeppolIdentifier) {
  if (Predicate.isNullish(id)) return undefined;
  if (Predicate.isNullish(id.schemeId) || id.schemeId === '') return id.id;
  return { '#text': id.id, '@schemeID': id.schemeId };
});
