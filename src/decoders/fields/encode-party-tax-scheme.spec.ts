import { describe, it, expect } from 'vitest';

import { encodePartyTaxScheme } from './encode-party-tax-scheme';

describe('encodePartyTaxScheme', () => {
  it('returns undefined when party tax scheme is missing', () => {
    // ❌ Negative: undefined party tax scheme → undefined.
    expect(encodePartyTaxScheme(undefined)).toBeUndefined();
  });

  it('encodes a present party tax scheme', () => {
    // ✅ Positive: company id and tax scheme id are encoded.
    expect(encodePartyTaxScheme({ companyId: 'C', taxSchemeId: { id: 'VAT' } })).toEqual({
      'cbc:CompanyID': 'C',
      'cac:TaxScheme': { 'cbc:ID': 'VAT' },
    });
  });
});
