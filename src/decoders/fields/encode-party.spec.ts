import { Effect } from 'effect';
import { describe, it, expect } from 'vitest';

import { encodeParty } from './encode-party';

const fullParty = {
  contact: { electronicMail: 'jane@example.com', name: 'Jane', telephone: '555' },
  endpointId: { id: '7300010000001', schemeId: '0088' },
  partyIdentification: { id: { id: '5060012349998', schemeId: '0088' } },
  partyLegalEntity: {
    companyId: { id: '987654321', schemeId: '0088' },
    companyLegalForm: 'Share capital',
    registrationName: 'Full Formal Seller Name LTD.',
  },
  partyName: { name: 'Seller Business Name AS' },
  partyTaxSchemes: [{ companyId: 'GB123', taxSchemeId: { id: 'VAT' } }],
  postalAddress: { cityName: 'London', countryCode: { identificationCode: 'GB' } },
};

describe('encodeParty', () => {
  it('returns undefined when party is missing', () => {
    // ❌ Negative: undefined party → undefined.
    expect(Effect.runSync(encodeParty(undefined))).toBeUndefined();
  });

  it('encodes a fully present party', () => {
    // ✅ Positive: all optional sub-blocks (name, identification, contact) are encoded.
    const result = Effect.runSync(encodeParty(fullParty));
    expect(result?.['cac:Party']).toEqual({
      'cac:Contact': { 'cbc:ElectronicMail': 'jane@example.com', 'cbc:Name': 'Jane', 'cbc:Telephone': '555' },
      'cac:PartyIdentification': { 'cbc:ID': { '#text': '5060012349998', '@schemeID': '0088' } },
      'cac:PartyLegalEntity': {
        'cbc:CompanyID': { '#text': '987654321', '@schemeID': '0088' },
        'cbc:CompanyLegalForm': 'Share capital',
        'cbc:RegistrationName': 'Full Formal Seller Name LTD.',
      },
      'cac:PartyName': { 'cbc:Name': 'Seller Business Name AS' },
      'cac:PartyTaxScheme': [{ 'cbc:CompanyID': 'GB123', 'cac:TaxScheme': { 'cbc:ID': 'VAT' } }],
      'cac:PostalAddress': { 'cac:Country': { 'cbc:IdentificationCode': 'GB' }, 'cbc:CityName': 'London' },
      'cbc:EndpointID': { '#text': '7300010000001', '@schemeID': '0088' },
    });
  });

  it('omits optional party sub-blocks when they are absent', () => {
    // ❌ Negative: no partyName, no partyIdentification, no contact.
    const result = Effect.runSync(encodeParty({ partyLegalEntity: { registrationName: 'Full Formal Seller Name LTD.' } } as any));
    expect(result?.['cac:Party']?.['cac:PartyName']).toBeUndefined();
    expect(result?.['cac:Party']?.['cac:PartyIdentification']).toBeUndefined();
    expect(result?.['cac:Party']?.['cac:Contact']).toBeUndefined();
  });
});
