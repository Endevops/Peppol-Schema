/**
 * @description Currency codes as defined by ISO 4217.
 *
 * @see https://www.iso.org/iso-4217-currency-codes.html
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO4217/
 */
import * as z from 'zod/mini';

import type { currencyCodesKey } from '#/values/currency-code.generated';

import { currencyCodesKeys } from '#/values/currency-code.generated';

export type PeppolCurrencyCode = currencyCodesKey | ({} & string);

export function currencyCodeSchema(error?: string) {
  return z.string().check(z.refine(val => currencyCodesKeys.includes(val as (typeof currencyCodesKeys)[number]), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('currency-code', () => {
    it.each(currencyCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(currencyCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
