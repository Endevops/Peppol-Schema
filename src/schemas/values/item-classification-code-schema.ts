import * as z from 'zod/mini';

import { itemClassificationCodesKeys } from '#/values/item-classification-code.generated';
import type { itemClassificationCodesKey } from '#/values/item-classification-code.generated';

export type ItemClassificationCodes = itemClassificationCodesKey;

export function itemClassificationCodesSchema(error?: string) {
  return z.string().check(z.refine(val => itemClassificationCodesKeys.includes(val), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('item-classification-codes-schema', () => {
    it.each(itemClassificationCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(itemClassificationCodesSchema().parse(value)).toEqual(expected);
    });
  });
}
