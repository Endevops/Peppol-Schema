import type { PeppolCreditNoteTypeCode } from '#/schemas/values/credit-note-type-code-schema';

import { creditNoteTypeCodes } from '#/values/credit-notes-type-codes.generated';

export function getCreditNoteTypeCodeDescription(code: PeppolCreditNoteTypeCode): string {
  return (creditNoteTypeCodes as Record<string, string>)[code] as string;
}
