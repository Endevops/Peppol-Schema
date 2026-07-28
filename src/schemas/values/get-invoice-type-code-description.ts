import { invoiceTypeCodes } from '#/values/invoice-type-codes.generated';

import type { InvoiceTypeCode } from '#/schemas/values/invoice-type-code-schema';

export function getInvoiceTypeCodeDescription(code: InvoiceTypeCode): string {
  return invoiceTypeCodes[code];
}
