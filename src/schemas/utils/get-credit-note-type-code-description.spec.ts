import { describe, expect, it } from 'vitest';

import { creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

import { getCreditNoteTypeCodeDescription } from './get-credit-note-type-code-description';

describe('getCreditNoteTypeCodeDescription', () => {
  it.each(creditNoteTypeCodesKeys)('returns the description for a valid credit note type code (%s)', code => {
    expect(getCreditNoteTypeCodeDescription(code as never)).toBeTruthy();
  });
});
