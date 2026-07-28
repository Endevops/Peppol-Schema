import type { PeppolInvoiceLinePeriod } from '#/schemas/fields/invoice-line-period-schema';

export function encodeInvoiceLinePeriod(invoicePeriod: PeppolInvoiceLinePeriod | undefined) {
  return invoicePeriod ? { 'cbc:StartDate': invoicePeriod.startDate, 'cbc:EndDate': invoicePeriod.endDate } : undefined;
}
