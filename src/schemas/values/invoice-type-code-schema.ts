import * as z from 'zod/mini';

import type { InvoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

import { invoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

export type PeppolInvoiceType = InvoiceTypeCodesKeys;

export function invoiceTypeCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => invoiceTypeCodesKeys.includes(val as never), error));
}
