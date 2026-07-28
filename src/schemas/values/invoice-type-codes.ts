import * as z from 'zod/mini';

import { invoiceTypeCodes, type invoiceTypeCodesKey, invoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

export type InvoiceTypeCode = invoiceTypeCodesKey;

/**
 * @description Get the description of an invoice type code.
 *
 * @param code The code to get the description for.
 *
 * @returns The description of the code
 */
export function getInvoiceTypeCodeDescription(code: InvoiceTypeCode): string {
  return invoiceTypeCodes[code];
}

/**
 * @description Check if a given code is a valid invoice type code.
 *
 * @param code The code to check.
 */
export function isValidInvoiceTypeCode(code: string): code is InvoiceTypeCode {
  return code in invoiceTypeCodes;
}

export function invoiceTypeCodeSchema(error?: string) {
  // validate against PEPPOL-EN16931-P0100: Invoice type code MUST be set according to the profile.
  return z.string(error).check(z.refine(val => invoiceTypeCodesKeys.includes(val), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('invoice-type-codes', () => {
    it.each(invoiceTypeCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(invoiceTypeCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
