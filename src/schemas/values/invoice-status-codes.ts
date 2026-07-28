import * as z from 'zod/mini';

import { invoiceStatusCodesKeys, type invoiceStatusCodesKey } from '#/values/invoice-status-codes.generated';

export type InvoiceStatusCodes = invoiceStatusCodesKey;

// Re-exported under the original public name for backward compatibility
export { invoiceStatusCodesKeys as invoiceStatusCodeKeys };

export function invoiceStatusCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => invoiceStatusCodesKeys.includes(val), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('invoice-status-codes-schema', () => {
    it.each(invoiceStatusCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(invoiceStatusCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
