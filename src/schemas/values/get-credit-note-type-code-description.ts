import type { CreditNoteTypeCodes } from '#/schemas/values/credit-note-type-code-schema';

import { creditNoteTypeCodes } from '#/values/credit-notes-type-codes.generated';

export function getCreditNoteTypeCodeDescription(code: CreditNoteTypeCodes): string {
  return creditNoteTypeCodes[code];
}
