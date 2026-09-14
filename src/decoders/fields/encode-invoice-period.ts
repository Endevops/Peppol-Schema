import { Effect, Predicate } from 'effect';

import type { PeppolInvoicePeriod } from '#/schemas/fields/peppol-invoice-period-schema.ts';

export const encodeInvoicePeriod = Effect.fn(function* (invoicePeriod: PeppolInvoicePeriod | undefined) {
  return Predicate.isNotNullish(invoicePeriod)
    ? { 'cbc:StartDate': invoicePeriod.startDate, 'cbc:EndDate': invoicePeriod.endDate, 'cbc:DescriptionCode': invoicePeriod.descriptionCode }
    : undefined;
});
