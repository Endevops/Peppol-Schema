import { describe, it, expect } from 'vitest';

import { encodeTaxRepresentativeParty } from './encode-tax-representative-party';

describe('encodeTaxRepresentativeParty', () => {
  it('returns undefined when the tax representative party is missing', () => {
    // ❌ Negative: undefined tax representative party → undefined.
    expect(encodeTaxRepresentativeParty(undefined)).toBeUndefined();
  });

  it('encodes a fully present tax representative party', () => {
    // ✅ Positive: name, postal address and tax scheme are all encoded.
    expect(
      encodeTaxRepresentativeParty({
        name: 'Tax Rep Ltd',
        postalAddress: { countryCode: { identificationCode: 'GB' } },
        partyTaxScheme: { companyId: 'C', taxSchemeId: { id: 'VAT' } },
      })
    ).toEqual({
      'cac:PartyName': { 'cbc:Name': 'Tax Rep Ltd' },
      'cac:PostalAddress': { 'cac:Country': { 'cbc:IdentificationCode': 'GB' } },
      'cac:PartyTaxScheme': { 'cbc:CompanyID': 'C', 'cac:TaxScheme': { 'cbc:ID': 'VAT' } },
    });
  });
});
