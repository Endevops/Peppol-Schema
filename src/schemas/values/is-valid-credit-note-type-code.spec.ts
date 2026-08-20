import { describe, expect, it } from 'vitest';

import { isValidInvoiceTypeCode } from './is-valid-credit-note-type-code';

describe('isValidInvoiceTypeCode (credit note type codes)', () => {
  it('returns true for a valid credit note type code', () => {
    expect(isValidInvoiceTypeCode('81')).toBe(true);
  });

  it('returns false for an unknown code', () => {
    expect(isValidInvoiceTypeCode('999')).toBe(false);
  });
});
