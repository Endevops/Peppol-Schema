import type { PeppolInvoiceTypeCode } from '#/schemas/values/invoice-type-code-schema';

import { invoiceTypeCodes } from '#/values/invoice-type-codes.generated';

export function isValidInvoiceTypeCode(code: string): code is PeppolInvoiceTypeCode {
  return code in invoiceTypeCodes;
}
