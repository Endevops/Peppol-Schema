import { describe, expect, it } from 'vitest';

import { decodeTaxCategory } from './decode-tax-category';

describe('decodeTaxCategory', () => {
  it('returns undefined when the tax category path is missing', () => {
    const result = decodeTaxCategory({}, 'cac:TaxCategory');

    expect(result).toBeUndefined();
  });

  it('decodes a present tax category node', () => {
    const result = decodeTaxCategory(
      { 'cac:TaxCategory': { 'cac:TaxScheme': { 'cbc:ID': 'VAT' }, 'cbc:ID': 'S', 'cbc:Percent': '25' } },
      'cac:TaxCategory'
    );

    expect(result).toEqual({ id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } });
  });

  it('decodes a present but empty node to undefined fields', () => {
    const result = decodeTaxCategory({ 'cac:TaxCategory': {} }, 'cac:TaxCategory');

    expect(result).toEqual({ id: undefined, percent: undefined, taxSchemeId: undefined });
  });
});
