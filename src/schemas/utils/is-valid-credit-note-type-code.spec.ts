import { describe, expect, it } from 'vitest';

import { creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

import { isValidCreditNoteTypeCode } from './is-valid-credit-note-type-code';

describe('isValidCreditNoteTypeCode (credit note type codes)', () => {
  it.each(creditNoteTypeCodesKeys)('returns true for a valid credit note type code (%s)', code => {
    expect(isValidCreditNoteTypeCode(code)).toBe(true);
  });

  it('returns false for an unknown code', () => {
    expect(isValidCreditNoteTypeCode('999')).toBe(false);
  });
});
