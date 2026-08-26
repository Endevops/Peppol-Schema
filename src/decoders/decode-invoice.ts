import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolInvoice } from '#/schemas/invoice';

import { decodeBilling } from '#/decoders/decode-billing';
import { decodeInvoiceLines } from '#/decoders/fields/decode-invoice-lines';
import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeInvoice(value: XmlNode): PeppolInvoice {
  const root = value || {};
  const doc: XmlNode = getProp(root, 'ubl:Invoice') ?? root;

  return {
    ...decodeBilling(doc),
    dueDate: strOrUnd(doc, 'cbc:DueDate'),
    invoiceLines: decodeInvoiceLines(doc, 'cac:InvoiceLine'),
    invoiceTypeCode: strOrUnd(doc, 'cbc:InvoiceTypeCode'),
    projectReference: decodeSimpleIdentifer(doc, 'cac:ProjectReference'),
  } as PeppolInvoice;
}
