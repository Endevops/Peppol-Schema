import type { CreditNoteType } from '#/schemas/values/credit-note-type-code-schema';

import { creditNoteTypeCodes } from '#/values/credit-notes-type-codes.generated';

export function isValidCreditNoteTypeCode(code: string): code is CreditNoteType {
  return code in creditNoteTypeCodes;
}
