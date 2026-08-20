import { describe, it, expect } from 'vitest';

import { encodeTaxCategory } from './encode-tax-category';

describe('encodeTaxCategory', () => {
  it('returns undefined when tax category is missing', () => {
    // ❌ Negative: undefined tax category → undefined.
    expect(encodeTaxCategory(undefined)).toBeUndefined();
  });

  it('encodes a fully present tax category', () => {
    // ✅ Positive: id, percent and tax scheme id are encoded.
    expect(encodeTaxCategory({ id: 'VAT', percent: '20', taxSchemeId: { id: 'VAT' } })).toEqual({
      'cbc:ID': 'VAT',
      'cbc:Percent': '20',
      'cac:TaxScheme': { 'cbc:ID': 'VAT' },
    });
  });
});
