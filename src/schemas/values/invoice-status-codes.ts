import * as z from 'zod/mini';

import type { InvoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

import { invoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

/**
 * @description An invoice status code as defined by the PEPPOL subset of UNCL 4343 (T111).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4343-T111/
 */
export type PeppolInvoiceStatusCodes = InvoiceStatusCodesKeys;

/**
 * @description Validates an invoice status code against the PEPPOL subset of UNCL 4343 (T111).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid invoice status codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4343-T111/
 */
export function invoiceStatusCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => invoiceStatusCodesKeys.includes(val as never), error));
}
