import { describe, expect, it } from 'vitest';

import { decodeParty } from './decode-party';

const fullParty = {
  'cac:Contact': { 'cbc:ElectronicMail': 'jane@acme.no', 'cbc:Name': 'Jane', 'cbc:Telephone': '+4712345678' },
  'cac:PartyIdentification': { 'cbc:ID': 'PID-1' },
  'cac:PartyLegalEntity': { 'cbc:CompanyID': 'C-1', 'cbc:CompanyLegalForm': 'AS', 'cbc:RegistrationName': 'Acme AS' },
  'cac:PartyName': { 'cbc:Name': 'Acme AS' },
  'cac:PartyTaxScheme': [{ 'cac:TaxScheme': { 'cbc:ID': 'VAT' }, 'cbc:CompanyID': 'VAT123' }],
  'cac:PostalAddress': { 'cbc:CityName': 'Oslo' },
  'cbc:EndpointID': { '#text': 'party@acme.no', '@schemeID': 'EM' },
};

describe('decodeParty', () => {
  it('returns undefined when the party is undefined', () => {
    const result = decodeParty(undefined);

    expect(result).toBeUndefined();
  });

  it('returns undefined when the party path is missing', () => {
    const result = decodeParty({}, 'cac:AccountingParty');

    expect(result).toBeUndefined();
  });

  it('decodes a fully populated party node', () => {
    const result = decodeParty(fullParty);

    expect(result).toEqual({
      contact: { electronicMail: 'jane@acme.no', name: 'Jane', telephone: '+4712345678' },
      endpointId: { id: 'party@acme.no', schemeId: '00EM' },
      partyIdentification: { id: { id: 'PID-1' } },
      partyLegalEntity: { companyId: { id: 'C-1' }, companyLegalForm: 'AS', registrationName: 'Acme AS' },
      partyName: { name: 'Acme AS' },
      partyTaxSchemes: [{ companyId: 'VAT123', taxSchemeId: { id: 'VAT' } }],
      postalAddress: expect.objectContaining({ cityName: 'Oslo' }),
    });
  });

  it('decodes a present but empty party to undefined sub-parts', () => {
    const result = decodeParty({});

    expect(result).toEqual({
      contact: undefined,
      endpointId: undefined,
      partyIdentification: undefined,
      partyLegalEntity: undefined,
      partyName: undefined,
      partyTaxSchemes: undefined,
      postalAddress: undefined,
    });
  });
});
