import * as z from 'zod/mini';

import { dutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';
import type { dutyTaxFeeCategoriesKey } from '#/values/duty-tax-fee-categories.generated';

export type DutyTaxFeeCategoryCode = dutyTaxFeeCategoriesKey;

export function dutyTaxFeeCategorySchema(error?: string) {
  return z.string().check(z.refine(val => dutyTaxFeeCategoriesKeys.includes(val), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('duty-tax-fee-categories-code', () => {
    it.each(dutyTaxFeeCategoriesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(dutyTaxFeeCategorySchema().parse(value)).toEqual(expected);
    });
  });
}
