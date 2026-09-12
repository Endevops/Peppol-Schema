import { Effect } from 'effect';

import type { PeppolCreditNoteLine } from '#/schemas/fields/credit-note-line-schema';

import { encodeLineShared } from '#/decoders/fields/encode-line-shared';

export const encodeCreditNoteLines = Effect.fn(function* (creditNoteLines: Array<PeppolCreditNoteLine>) {
  if (creditNoteLines.length === 0) return undefined;

  return yield* Effect.forEach(creditNoteLines, encodeLineShared);
});
