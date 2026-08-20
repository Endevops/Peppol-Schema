import type { InvoiceTypeCode } from '#/schemas/values/invoice-type-code-schema';

import { invoiceTypeCodes } from '#/values/invoice-type-codes.generated';

export function getInvoiceTypeCodeDescription(code: InvoiceTypeCode): string {
  return invoiceTypeCodes[code];
}
