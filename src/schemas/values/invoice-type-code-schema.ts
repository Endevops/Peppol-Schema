import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { invoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

export type InvoiceType = Brand.Branded<string, 'InvoiceType'>;

export function invoiceTypeCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => invoiceTypeCodesKeys.includes(val as (typeof invoiceTypeCodesKeys)[number]), error));
}
