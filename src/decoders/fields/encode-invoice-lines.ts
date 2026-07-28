import type { PeppolInvoiceLine } from '#/schemas/fields/invoice-line-schema';

import { encodeLineShared } from '#/decoders/fields/encode-line-shared';

export function encodeInvoiceLines(invoiceLines: Array<PeppolInvoiceLine>) {
  if (!invoiceLines.length) return undefined;

  return invoiceLines.map(encodeLineShared);
}
