import * as z from 'zod/mini';

import { invoiceTypeCodes, type invoiceTypeCodesKey, invoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

export type InvoiceTypeCode = invoiceTypeCodesKey;

export function invoiceTypeCodeSchema(error?: string) {
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
