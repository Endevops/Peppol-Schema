import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { decodeBilling } from '#/decoders/decode-billing.ts';
import { decodeInvoiceLines } from '#/decoders/fields/decode-invoice-lines.ts';
import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier.ts';
import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodeInvoice = Effect.fn('decode-invoice')(function* (value: XmlNode) {
  const root = value || {};
  const doc: XmlNode = (yield* getProp(root, 'ubl:Invoice')) ?? root;

  return {
    ...(yield* decodeBilling(doc)),
    dueDate: yield* strOrUnd(doc, 'cbc:DueDate'),
    invoiceLines: yield* decodeInvoiceLines(doc, 'cac:InvoiceLine'),
    invoiceTypeCode: yield* strOrUnd(doc, 'cbc:InvoiceTypeCode'),
    projectReference: yield* decodeSimpleIdentifer(doc, 'cac:ProjectReference'),
  };
});
