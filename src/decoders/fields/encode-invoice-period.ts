import type { PeppolInvoicePeriod } from '#/schemas/fields/invoice-period-schema';

export function encodeInvoicePeriod(invoicePeriod: PeppolInvoicePeriod | undefined) {
  return invoicePeriod
    ? { 'cbc:StartDate': invoicePeriod.startDate, 'cbc:EndDate': invoicePeriod.endDate, 'cbc:DescriptionCode': invoicePeriod.descriptionCode }
    : undefined;
}
