import { Effect } from 'effect';

import type { PeppolNodeError } from '#/helpers/errors';
import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolInvoice } from '#/schemas/invoice';

import { decodeBilling } from '#/decoders/decode-billing';
import { decodeInvoiceLines } from '#/decoders/fields/decode-invoice-lines';
import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeInvoice = Effect.fn(function* (value: XmlNode): Effect.fn.Return<PeppolInvoice, PeppolNodeError> {
  const root = value || {};
  const doc: XmlNode = (yield* getProp(root, 'ubl:Invoice')) ?? root;

  return {
    ...(yield* decodeBilling(doc)),
    dueDate: yield* strOrUnd(doc, 'cbc:DueDate'),
    invoiceLines: yield* decodeInvoiceLines(doc, 'cac:InvoiceLine'),
    invoiceTypeCode: yield* strOrUnd(doc, 'cbc:InvoiceTypeCode'),
    projectReference: yield* decodeSimpleIdentifer(doc, 'cac:ProjectReference'),
  } as PeppolInvoice;
});
