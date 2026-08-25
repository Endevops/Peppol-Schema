import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { invoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

export type InvoiceStatusCodes = Brand.Branded<string, 'InvoiceStatusCodes'>;

export function invoiceStatusCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => invoiceStatusCodesKeys.includes(val as (typeof invoiceStatusCodesKeys)[number]), error));
}
