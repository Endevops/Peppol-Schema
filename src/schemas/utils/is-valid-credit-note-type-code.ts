import type { PeppolCreditNoteTypeCode } from '#/schemas/values/credit-note-type-code-schema';

import { creditNoteTypeCodes } from '#/values/credit-notes-type-codes.generated';

export function isValidCreditNoteTypeCode(code: string): code is PeppolCreditNoteTypeCode {
  return code in creditNoteTypeCodes;
}
