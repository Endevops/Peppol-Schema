import { describe, expect, it } from 'vitest';

import { decodePartyTaxScheme } from './decode-party-tax-scheme';

describe('decodePartyTaxScheme', () => {
  it('returns undefined when the party tax scheme path is missing', () => {
    const result = decodePartyTaxScheme({}, 'cac:PartyTaxScheme');

    expect(result).toBeUndefined();
  });

  it('decodes a present party tax scheme node', () => {
    const result = decodePartyTaxScheme(
      { 'cac:PartyTaxScheme': { 'cac:TaxScheme': { 'cbc:ID': 'VAT' }, 'cbc:CompanyID': '123456' } },
      'cac:PartyTaxScheme'
    );

    expect(result).toEqual({ companyId: '123456', taxSchemeId: { id: 'VAT' } });
  });

  it('decodes a present but empty node to undefined fields', () => {
    const result = decodePartyTaxScheme({ 'cac:PartyTaxScheme': {} }, 'cac:PartyTaxScheme');

    expect(result).toEqual({ companyId: undefined, taxSchemeId: undefined });
  });
});
