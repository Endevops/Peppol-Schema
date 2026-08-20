import { describe, expect, it } from 'vitest';

import { getCreditNoteTypeCodeDescription } from './get-credit-note-type-code-description';

describe('getCreditNoteTypeCodeDescription', () => {
  it('returns the description for a valid credit note type code', () => {
    expect(getCreditNoteTypeCodeDescription('81' as never)).toBeTruthy();
    expect(getCreditNoteTypeCodeDescription('396' as never)).toBeTruthy();
  });
});
