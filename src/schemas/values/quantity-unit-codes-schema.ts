import * as z from 'zod/mini';

import type { quantityUnitCodesKey } from '#/values/quantity-unit-codes.generated';

import { quantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated';

export type QuantityUnitCode = quantityUnitCodesKey;
export type PeppolQuantityUnitCodes = quantityUnitCodesKey;

export function quantityUnitCodesSchema(error?: string) {
  return z.string(error).check(z.refine(val => quantityUnitCodesKeys.includes(val as QuantityUnitCode)));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('quantity-unit-code', () => {
    it.each(quantityUnitCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(quantityUnitCodesSchema().parse(value)).toEqual(expected);
    });
  });
}
