import { Schema } from 'effect';

import type { InvoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

import { invoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

/**
 * @description An invoice type code as defined by the PEPPOL subset of UNCL 1001 (invoice).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-inv/
 */
export type PeppolInvoiceTypeCode = InvoiceTypeCodesKeys;

/**
 * @description Validates an invoice type code against the PEPPOL subset of UNCL 1001 (invoice).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid invoice type codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-inv/
 */
export function invoiceTypeCodeSchema(error?: string) {
  const schema = Schema.Literals(invoiceTypeCodesKeys);
  return error === undefined ? schema : schema.annotate({ message: error });
}
