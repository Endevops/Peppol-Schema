import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolInvoicePeriod } from '#/schemas/fields/invoice-period-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeInvoicePeriod = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolInvoicePeriod> | undefined> {
  const invoicePeriod = yield* getProp(doc, ...path);
  return Predicate.isNotNullish(invoicePeriod)
    ? {
        descriptionCode: yield* strOrUnd(invoicePeriod, 'cbc:DescriptionCode'),
        endDate: yield* strOrUnd(invoicePeriod, 'cbc:EndDate'),
        startDate: yield* strOrUnd(invoicePeriod, 'cbc:StartDate'),
      }
    : undefined;
});
