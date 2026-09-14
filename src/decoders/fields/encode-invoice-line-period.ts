import { Effect, Predicate } from 'effect';

import type { PeppolInvoiceLinePeriod } from '#/schemas/fields/peppol-invoice-line-period-schema';

export const encodeInvoiceLinePeriod = Effect.fn(function* (invoicePeriod: PeppolInvoiceLinePeriod | undefined) {
  return Predicate.isNotNullish(invoicePeriod) ? { 'cbc:StartDate': invoicePeriod.startDate, 'cbc:EndDate': invoicePeriod.endDate } : undefined;
});
