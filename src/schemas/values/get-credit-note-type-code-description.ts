import { creditNoteTypeCodes } from '#/values/credit-notes-type-codes.generated';

import type { CreditNoteTypeCodes } from '#/schemas/values/credit-note-type-code-schema';

export function getCreditNoteTypeCodeDescription(code: CreditNoteTypeCodes): string {
  return creditNoteTypeCodes[code];
}
