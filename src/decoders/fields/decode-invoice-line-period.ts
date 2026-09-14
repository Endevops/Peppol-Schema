import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolInvoiceLinePeriod } from '#/schemas/fields/peppol-invoice-line-period-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodeInvoiceLinePeriod = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolInvoiceLinePeriod> | undefined> {
  const invoicePeriod = yield* getProp(doc, ...path);
  return Predicate.isNotNullish(invoicePeriod)
    ? { endDate: yield* strOrUnd(invoicePeriod, 'cbc:EndDate'), startDate: yield* strOrUnd(invoicePeriod, 'cbc:StartDate') }
    : undefined;
});
