import type { PeppolCreditNoteLine } from '#/schemas/fields/credit-note-line-schema';

import { encodeLineShared } from '#/decoders/fields/encode-line-shared';

export function encodeCreditNoteLines(creditNoteLines: Array<PeppolCreditNoteLine>) {
  if (!creditNoteLines.length) return undefined;

  return creditNoteLines.map(encodeLineShared);
}
