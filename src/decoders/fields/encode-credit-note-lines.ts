import { Effect } from 'effect';

import type { PeppolCreditNoteLine } from '#/schemas/fields/peppol-credit-note-line-schema.ts';

import { encodeLineShared } from '#/decoders/fields/encode-line-shared.ts';

export const encodeCreditNoteLines = Effect.fn(function* (creditNoteLines: ReadonlyArray<PeppolCreditNoteLine>) {
  if (creditNoteLines.length === 0) return undefined;

  return yield* Effect.forEach(creditNoteLines, encodeLineShared);
});
