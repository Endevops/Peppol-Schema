import * as z from 'zod/mini';

import type { invoiceStatusCodesKey } from '#/values/invoice-status-codes.generated';

import { invoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

export type InvoiceStatusCodes = invoiceStatusCodesKey;

// Re-exported under the original public name for backward compatibility
export { invoiceStatusCodesKeys as invoiceStatusCodeKeys };

export function invoiceStatusCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => invoiceStatusCodesKeys.includes(val as never), error));
}
