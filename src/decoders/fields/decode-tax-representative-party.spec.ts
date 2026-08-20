import { describe, expect, it } from 'vitest';

import { decodeTaxRepresentativeParty } from './decode-tax-representative-party';

describe('decodeTaxRepresentativeParty', () => {
  it('returns undefined when the tax representative path is missing', () => {
    const result = decodeTaxRepresentativeParty({}, 'cac:TaxRepresentativeParty');

    expect(result).toBeUndefined();
  });

  it('decodes a present tax representative node', () => {
    const result = decodeTaxRepresentativeParty(
      {
        'cac:TaxRepresentativeParty': {
          'cac:PartyName': { 'cbc:Name': 'Rep LLC' },
          'cac:PartyTaxScheme': { 'cac:TaxScheme': { 'cbc:ID': 'VAT' }, 'cbc:CompanyID': 'VAT123' },
          'cac:PostalAddress': { 'cbc:CityName': 'Oslo', 'cbc:StreetName': 'Main St' },
        },
      },
      'cac:TaxRepresentativeParty'
    );

    expect(result).toEqual({
      name: 'Rep LLC',
      partyTaxScheme: { companyId: 'VAT123', taxSchemeId: { id: 'VAT' } },
      postalAddress: expect.objectContaining({ cityName: 'Oslo', streetName: 'Main St' }),
    });
  });

  it('decodes a present but empty node to undefined fields', () => {
    const result = decodeTaxRepresentativeParty({ 'cac:TaxRepresentativeParty': {} }, 'cac:TaxRepresentativeParty');

    expect(result).toEqual({ name: undefined, partyTaxScheme: undefined, postalAddress: undefined });
  });
});
