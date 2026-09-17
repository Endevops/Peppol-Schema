import type { PeppolInvoiceTypeCode } from '#/schemas/values/invoice-type-code-schema.ts';

import { invoiceTypeCodes } from '#/values/invoice-type-codes.generated';

/**
 * @description Type guard for PEPPOL invoice type codes (UNCL1001 subset).
 *
 * @example
 *   ```ts
 *   isValidInvoiceTypeCode('380'); // true
 *   isValidInvoiceTypeCode('UNKNOWN'); // false
 *   ```;
 *
 * @param code - The string to test.
 *
 * @returns `true` when `code` is a known invoice type code, narrowing it to {@link PeppolInvoiceTypeCode}; otherwise `false`.
 */
export function isValidInvoiceTypeCode(code: string): code is PeppolInvoiceTypeCode {
  return code in invoiceTypeCodes;
}
