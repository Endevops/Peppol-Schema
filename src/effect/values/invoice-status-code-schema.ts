import { Schema } from 'effect';

import { invoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

/**
 * @description An invoice status code as defined by the PEPPOL subset of UNCL 4343 (T111).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4343-T111/
 */
export type PeppolInvoiceStatusCodes = typeof invoiceStatusCodeSchema.Type;

/**
 * @description Validates an invoice status code against the PEPPOL subset of UNCL 4343 (T111).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid invoice status codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4343-T111/
 */
export const invoiceStatusCodeSchema = Schema.Literals(invoiceStatusCodesKeys).pipe(Schema.brand('PeppolInvoiceStatusCodes'));
