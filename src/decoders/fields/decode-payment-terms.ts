import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolPaymentTerms } from '#/schemas/fields/peppol-payment-terms-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodePaymentTerms = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPaymentTerms> | undefined> {
  const terms = yield* getProp(doc, ...path);
  if (Predicate.isNullish(terms)) return undefined;
  const note = yield* getProp(terms, 'cbc:Note');
  return Predicate.isNotNullish(note) ? { note: yield* strOrUnd(note) } : undefined;
});
