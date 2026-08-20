import { describe, expect, it } from 'vitest';

import { itemClassificationCodesKeys } from '#/values/item-classification-code.generated';

import { itemClassificationCodesSchema } from './item-classification-code-schema';

describe('item-classification-codes-schema', () => {
  it.each(itemClassificationCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(itemClassificationCodesSchema().parse(value)).toEqual(expected);
  });
});
