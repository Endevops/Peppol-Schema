import type { PeppolCreditNoteTypeCode } from '#/schemas/values/credit-note-type-code-schema.ts';

import { creditNoteTypeCodes } from '#/values/credit-notes-type-codes.generated';

/**
 * @description Returns the human-readable description of a PEPPOL credit note type code (UNCL1001 subset).
 *
 * @example
 *   ```ts
 *   getCreditNoteTypeCodeDescription('381'); // 'Credit note'
 *   ```;
 *
 * @param code - A valid {@link PeppolCreditNoteTypeCode}, for example `'381'`.
 *
 * @returns The description registered for the code, for example `'Credit note'`.
 */
export function getCreditNoteTypeCodeDescription(code: PeppolCreditNoteTypeCode): string {
  return (creditNoteTypeCodes as Record<string, string>)[code] as string;
}
