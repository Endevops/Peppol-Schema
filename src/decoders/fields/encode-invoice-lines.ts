import { Effect } from 'effect';

import type { PeppolInvoiceLine } from '#/schemas/fields/invoice-line-schema';

import { encodeLineShared } from '#/decoders/fields/encode-line-shared';

export const encodeInvoiceLines = Effect.fn(function* (invoiceLines: Array<PeppolInvoiceLine>) {
  if (invoiceLines.length === 0) return undefined;

  return yield* Effect.forEach(invoiceLines, encodeLineShared);
});
