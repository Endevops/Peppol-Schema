import { describe, it, expect } from 'vitest';

import { encodePaymentTerms } from './encode-payment-terms';

describe('encodePaymentTerms', () => {
  it('returns undefined when payment terms are missing', () => {
    // ❌ Negative: undefined payment terms → undefined.
    expect(encodePaymentTerms(undefined)).toBeUndefined();
  });

  it('encodes a present note', () => {
    // ✅ Positive: the note is mapped to cbc:Note.
    expect(encodePaymentTerms({ note: 'Net within 30 days' })).toEqual({ 'cbc:Note': 'Net within 30 days' });
  });
});
