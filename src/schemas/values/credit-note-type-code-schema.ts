import * as z from 'zod/mini';

import { creditNoteTypeCodes, type creditNoteTypeCodesKey, creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

export type CreditNoteTypeCodes = creditNoteTypeCodesKey;

export function creditNoteTypeCodeSchema(error?: string) {
  return z.string().check(z.refine(val => creditNoteTypeCodesKeys.includes(val), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('credit-note-type-codes', () => {
    it.each(creditNoteTypeCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(creditNoteTypeCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
