import { describe, expect, it } from 'vitest';

import { dutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';

import { dutyTaxFeeCategorySchema } from './duty-tax-fee-cateogries';

describe('duty-tax-fee-categories-code', () => {
  it.each(dutyTaxFeeCategoriesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(dutyTaxFeeCategorySchema().parse(value)).toEqual(expected);
  });
});
