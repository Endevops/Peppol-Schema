import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPaymentTerms } from '#/schemas/fields/payment-terms-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodePaymentTerms = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPaymentTerms> | undefined> {
  const terms = yield* getProp(doc, ...path);
  if (Predicate.isNullish(terms)) return undefined;
  const note = yield* getProp(terms, 'cbc:Note');
  return Predicate.isNotNullish(note) ? { note: yield* strOrUnd(note) } : undefined;
});
