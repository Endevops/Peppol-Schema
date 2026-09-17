import type { PeppolCreditNoteTypeCode } from '#/schemas/values/credit-note-type-code-schema.ts';

import { creditNoteTypeCodes } from '#/values/credit-notes-type-codes.generated';

/**
 * @description Type guard for PEPPOL credit note type codes (UNCL1001 subset).
 *
 * @example
 *   ```ts
 *   isValidCreditNoteTypeCode('381'); // true
 *   isValidCreditNoteTypeCode('UNKNOWN'); // false
 *   ```;
 *
 * @param code - The string to test.
 *
 * @returns `true` when `code` is a known credit note type code, narrowing it to {@link PeppolCreditNoteTypeCode}; otherwise `false`.
 */
export function isValidCreditNoteTypeCode(code: string): code is PeppolCreditNoteTypeCode {
  return code in creditNoteTypeCodes;
}
