import * as z from 'zod/mini';

import type { InvoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

import { invoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

export type PeppolInvoiceStatusCodes = InvoiceStatusCodesKeys;

export function invoiceStatusCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => invoiceStatusCodesKeys.includes(val as never), error));
}
