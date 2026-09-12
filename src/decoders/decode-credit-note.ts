import { Effect } from 'effect';

import type { PeppolNodeError } from '#/helpers/errors';
import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolCreditNote } from '#/schemas/credit-note';

import { decodeBilling } from '#/decoders/decode-billing';
import { decodeCreditNoteLines } from '#/decoders/fields/decode-credit-note-lines';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeCreditNote = Effect.fn(function* (value: XmlNode): Effect.fn.Return<PeppolCreditNote, PeppolNodeError> {
  const root = value || {};
  const doc: XmlNode = (yield* getProp(root, 'ubl:CreditNote')) ?? root; // accept either the whole JSON or just the CreditNote node

  return {
    ...(yield* decodeBilling(doc)),
    creditNoteLines: yield* decodeCreditNoteLines(doc, 'cac:CreditNoteLine'),
    creditNoteTypeCode: yield* strOrUnd(doc, 'cbc:CreditNoteTypeCode'),
  } as PeppolCreditNote;
});
