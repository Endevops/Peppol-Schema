import type { PeppolInvoiceType } from '#/schemas/values/invoice-type-code-schema';

import { invoiceTypeCodes } from '#/values/invoice-type-codes.generated';

export function getInvoiceTypeCodeDescription(code: PeppolInvoiceType): string {
  return (invoiceTypeCodes as Record<string, string>)[code] as string;
}
