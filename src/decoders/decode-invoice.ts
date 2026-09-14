import { Effect, SchemaParser } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { decodeBilling } from '#/decoders/decode-billing';
import { decodeInvoiceLines } from '#/decoders/fields/decode-invoice-lines';
import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';
import { PeppolInvoice } from '#/schemas/peppol-invoice-schema';

const validateInvoice = SchemaParser.encodeUnknownEffect(PeppolInvoice);
export const decodeInvoice = Effect.fn(function* (value: XmlNode) {
  const root = value || {};
  const doc: XmlNode = (yield* getProp(root, 'ubl:Invoice')) ?? root;

  return yield* validateInvoice({
    ...(yield* decodeBilling(doc)),
    dueDate: yield* strOrUnd(doc, 'cbc:DueDate'),
    invoiceLines: yield* decodeInvoiceLines(doc, 'cac:InvoiceLine'),
    invoiceTypeCode: yield* strOrUnd(doc, 'cbc:InvoiceTypeCode'),
    projectReference: yield* decodeSimpleIdentifer(doc, 'cac:ProjectReference'),
  });
});
