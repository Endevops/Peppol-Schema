import * as z from 'zod/mini';
import { creditNoteTypeCodes, type creditNoteTypeCodesKey, creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

export type CreditNoteTypeCodes = creditNoteTypeCodesKey;

/**
 * @description Get the description of an invoice type code.
 *
 * @param code The code to get the description for.
 *
 * @returns The description of the code
 */
export function getCreditNoteTypeCodeDescription(code: CreditNoteTypeCodes): string {
  return creditNoteTypeCodes[code];
}

/**
 * @description Check if a given code is a valid invoice type code.
 *
 * @param code The code to check.
 */
export function isValidInvoiceTypeCode(code: string): code is CreditNoteTypeCodes {
  return code in creditNoteTypeCodes;
}

export function creditNoteTypeCodeSchema(error?: string) {
  // validate against PEPPOL-EN16931-P0100: Invoice type code MUST be set according to the profile.
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
