import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolCreditNote } from '#/schemas/credit-note';

import { decodeBilling } from '#/decoders/decode-billing';
import { decodeCreditNoteLines } from '#/decoders/fields/decode-credit-note-lines';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeCreditNote(value: XmlNode): PeppolCreditNote {
  const root = value || {};
  const doc: XmlNode = getProp(root, 'ubl:CreditNote') ?? root; // accept either the whole JSON or just the CreditNote node

  return {
    ...decodeBilling(doc),
    creditNoteLines: decodeCreditNoteLines(doc, 'cac:CreditNoteLine'),
    creditNoteTypeCode: strOrUnd(doc, 'cbc:CreditNoteTypeCode'),
  } as PeppolCreditNote;
}
