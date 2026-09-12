import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolInvoiceLinePeriod } from '#/schemas/fields/invoice-line-period-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeInvoiceLinePeriod = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolInvoiceLinePeriod> | undefined> {
  const invoicePeriod = yield* getProp(doc, ...path);
  return Predicate.isNotNullish(invoicePeriod)
    ? { endDate: yield* strOrUnd(invoicePeriod, 'cbc:EndDate'), startDate: yield* strOrUnd(invoicePeriod, 'cbc:StartDate') }
    : undefined;
});
