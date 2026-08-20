import * as z from 'zod/mini';

import { vatDateCodesKeys } from '#/values/vat-dates.generated';

export type { vatDateCodesKey as VatDateCodes } from '#/values/vat-dates.generated';

/**
 * @validations
 * - PEPPOL-EN16931-CL006: Invoice period description code must be according to UNCL 2005 D.16B.
 */
export function vatDateCodeSchema(error?: string) {
  return z.string().check(z.refine(val => vatDateCodesKeys.includes(val as (typeof vatDateCodesKeys)[number]), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('vat-date-code', () => {
    it.each(vatDateCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(vatDateCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
