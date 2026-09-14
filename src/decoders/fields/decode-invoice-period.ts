import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodeInvoicePeriod = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const invoicePeriod = yield* getProp(doc, ...path);
  if (Predicate.isNullish(invoicePeriod)) return undefined;
  return {
    descriptionCode: yield* strOrUnd(invoicePeriod, 'cbc:DescriptionCode'),
    endDate: yield* strOrUnd(invoicePeriod, 'cbc:EndDate'),
    startDate: yield* strOrUnd(invoicePeriod, 'cbc:StartDate'),
  };
});
