import { invoiceTypeCodes } from '#/values/invoice-type-codes.generated';

import type { InvoiceTypeCode } from '#/schemas/values/invoice-type-code-schema';

export function isValidInvoiceTypeCode(code: string): code is InvoiceTypeCode {
  return code in invoiceTypeCodes;
}
