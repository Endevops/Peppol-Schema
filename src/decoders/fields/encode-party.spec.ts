import { describe, it, expect } from 'vitest';

import { encodeParty } from './encode-party';

const fullParty = {
  endpointId: { id: '7300010000001', schemeId: '0088' },
  partyIdentification: { id: { id: '5060012349998', schemeId: '0088' } },
  partyName: { name: 'Seller Business Name AS' },
  postalAddress: { countryCode: { identificationCode: 'GB' }, cityName: 'London' },
  partyTaxSchemes: [{ companyId: 'GB123', taxSchemeId: { id: 'VAT' } }],
  partyLegalEntity: {
    registrationName: 'Full Formal Seller Name LTD.',
    companyId: { id: '987654321', schemeId: '0088' },
    companyLegalForm: 'Share capital',
  },
  contact: { name: 'Jane', telephone: '555', electronicMail: 'jane@example.com' },
};

describe('encodeParty', () => {
  it('returns undefined when party is missing', () => {
    // ❌ Negative: undefined party → undefined.
    expect(encodeParty(undefined)).toBeUndefined();
  });

  it('encodes a fully present party', () => {
    // ✅ Positive: all optional sub-blocks (name, identification, contact) are encoded.
    const result = encodeParty(fullParty);
    expect(result?.['cac:Party']).toEqual({
      'cbc:EndpointID': { '#text': '7300010000001', '@schemeID': '0088' },
      'cac:PartyIdentification': { 'cbc:ID': { '#text': '5060012349998', '@schemeID': '0088' } },
      'cac:PartyName': { 'cbc:Name': 'Seller Business Name AS' },
      'cac:PostalAddress': { 'cbc:CityName': 'London', 'cac:Country': { 'cbc:IdentificationCode': 'GB' } },
      'cac:PartyTaxScheme': [{ 'cbc:CompanyID': 'GB123', 'cac:TaxScheme': { 'cbc:ID': 'VAT' } }],
      'cac:PartyLegalEntity': {
        'cbc:RegistrationName': 'Full Formal Seller Name LTD.',
        'cbc:CompanyID': { '#text': '987654321', '@schemeID': '0088' },
        'cbc:CompanyLegalForm': 'Share capital',
      },
      'cac:Contact': { 'cbc:Name': 'Jane', 'cbc:Telephone': '555', 'cbc:ElectronicMail': 'jane@example.com' },
    });
  });

  it('omits optional party sub-blocks when they are absent', () => {
    // ❌ Negative: no partyName, no partyIdentification, no contact.
    const result = encodeParty({ partyLegalEntity: { registrationName: 'Full Formal Seller Name LTD.' } } as any);
    expect(result?.['cac:Party']?.['cac:PartyName']).toBeUndefined();
    expect(result?.['cac:Party']?.['cac:PartyIdentification']).toBeUndefined();
    expect(result?.['cac:Party']?.['cac:Contact']).toBeUndefined();
  });
});
