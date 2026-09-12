import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeInvoice } from './decode-invoice';

describe('decodeInvoice', () => {
  it('handles an undefined value', () => {
    const out = Effect.runSync(decodeInvoice(undefined));
    expect(out.id).toBeUndefined();
    expect(out.profileId).toBeUndefined();
  });

  it('accepts a bare root without the ubl:Invoice wrapper', () => {
    const out = Effect.runSync(decodeInvoice({ 'cbc:ID': 'INV1', 'cbc:ProfileID': 'P1' } as never));
    expect(out.id).toBe('INV1');
    expect(out.profileId).toBe('P1');
  });

  it('decodes a wrapped ubl:Invoice root', () => {
    const out = Effect.runSync(decodeInvoice({ 'ubl:Invoice': { 'cbc:ID': 'INV2' } } as never));
    expect(out.id).toBe('INV2');
  });
});
