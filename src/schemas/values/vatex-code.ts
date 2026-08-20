import * as z from 'zod/mini';

import type { vatexCodesKey } from '#/values/vatex-codes.generated';

import { vatexCodesKeys } from '#/values/vatex-codes.generated';

export type PeppolVatexCode = vatexCodesKey;

export function vatexCodeschema(error?: string) {
  return z.string(error).check(z.refine(val => vatexCodesKeys.includes(val as PeppolVatexCode), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('vatex-code', () => {
    it.each(vatexCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(vatexCodeschema().parse(value)).toEqual(expected);
    });
  });
}
