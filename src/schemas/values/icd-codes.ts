import * as z from 'zod/mini';

import { icdCodesKeys } from '#/values/icd-codes.generated';
import type { icdCodesKey } from '#/values/icd-codes.generated';

export type IcdCode = icdCodesKey;

export function icdCodesSchema(error = 'Invalid ICD code provided') {
  return z.string(error).check(z.refine(val => icdCodesKeys.includes(val), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('icd-codes', () => {
    it.each(icdCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(icdCodesSchema().parse(value)).toEqual(expected);
    });
  });
}
