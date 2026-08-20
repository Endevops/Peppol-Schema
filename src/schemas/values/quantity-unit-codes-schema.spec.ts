import { describe, expect, it } from 'vitest';

import { quantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated';

import { quantityUnitCodesSchema } from './quantity-unit-codes-schema';

describe('quantity-unit-code', () => {
  it.each(quantityUnitCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(quantityUnitCodesSchema().parse(value)).toEqual(expected);
  });
});
