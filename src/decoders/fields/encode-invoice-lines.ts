import { Effect } from 'effect';

import type { PeppolInvoiceLine } from '#/schemas/fields/peppol-invoice-line-schema.ts';

import { encodeLineShared } from '#/decoders/fields/encode-line-shared.ts';

export const encodeInvoiceLines = Effect.fn(function* (invoiceLines: ReadonlyArray<PeppolInvoiceLine>) {
  if (invoiceLines.length === 0) return undefined;

  return yield* Effect.forEach(invoiceLines, encodeLineShared);
});
