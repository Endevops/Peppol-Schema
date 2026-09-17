import type { PeppolInvoiceTypeCode } from '#/schemas/values/invoice-type-code-schema.ts';

import { invoiceTypeCodes } from '#/values/invoice-type-codes.generated';

/**
 * @description Returns the human-readable description of a PEPPOL invoice type code (UNCL1001 subset).
 *
 * @example
 *   ```ts
 *   getInvoiceTypeCodeDescription('380'); // 'Commercial invoice'
 *   ```;
 *
 * @param code - A valid {@link PeppolInvoiceTypeCode}, for example `'380'`.
 *
 * @returns The description registered for the code, for example `'Commercial invoice'`.
 */
export function getInvoiceTypeCodeDescription(code: PeppolInvoiceTypeCode): string {
  return (invoiceTypeCodes as Record<string, string>)[code] as string;
}
