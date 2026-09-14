import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { decodeBilling } from '#/decoders/decode-billing.ts';
import { decodeCreditNoteLines } from '#/decoders/fields/decode-credit-note-lines.ts';
import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodeCreditNote = Effect.fn('decode-credit-note')(function* (value: XmlNode) {
  const root = value || {};
  const doc: XmlNode = (yield* getProp(root, 'ubl:CreditNote')) ?? root; // accept either the whole JSON or just the CreditNote node

  return {
    ...(yield* decodeBilling(doc)),
    creditNoteLines: yield* decodeCreditNoteLines(doc, 'cac:CreditNoteLine'),
    creditNoteTypeCode: yield* strOrUnd(doc, 'cbc:CreditNoteTypeCode'),
  };
});
