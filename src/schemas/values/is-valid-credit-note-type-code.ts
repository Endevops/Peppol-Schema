import type { CreditNoteTypeCodes } from '#/schemas/values/credit-note-type-code-schema';

import { creditNoteTypeCodes } from '#/values/credit-notes-type-codes.generated';

export function isValidInvoiceTypeCode(code: string): code is CreditNoteTypeCodes {
  return code in creditNoteTypeCodes;
}
