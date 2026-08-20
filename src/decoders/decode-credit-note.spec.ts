import { describe, expect, it } from 'vitest';

import { decodeCreditNote } from './decode-credit-note';

describe('decodeCreditNote', () => {
  it('handles an undefined value', () => {
    const out = decodeCreditNote(undefined);
    expect(out.id).toBeUndefined();
    expect(out.profileId).toBeUndefined();
  });

  it('accepts a bare root without the ubl:CreditNote wrapper', () => {
    const out = decodeCreditNote({ 'cbc:ID': 'CN1', 'cbc:ProfileID': 'P1' } as never);
    expect(out.id).toBe('CN1');
    expect(out.profileId).toBe('P1');
  });

  it('decodes a wrapped ubl:CreditNote root', () => {
    const out = decodeCreditNote({ 'ubl:CreditNote': { 'cbc:ID': 'CN2' } } as never);
    expect(out.id).toBe('CN2');
  });
});
