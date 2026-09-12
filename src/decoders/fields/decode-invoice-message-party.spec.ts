import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeInvoiceMessageParty } from './decode-invoice-message-party';

describe('decodeInvoiceMessageParty', () => {
  it('returns undefined when the party path is missing', () => {
    const result = Effect.runSync(decodeInvoiceMessageParty({}, 'cac:AccountingSupplierParty'));

    expect(result).toBeUndefined();
  });

  it('decodes a fully populated party node', () => {
    const result = Effect.runSync(
      decodeInvoiceMessageParty(
        {
          'cac:AccountingSupplierParty': {
            'cac:Contact': { 'cbc:ElectronicMail': 'jane@acme.no', 'cbc:Name': 'Jane', 'cbc:Telephone': '+4712345678' },
            'cac:PartyIdentification': { 'cbc:ID': 'PI-1' },
            'cac:PartyLegalEntity': { 'cbc:CompanyID': 'C-1', 'cbc:CompanyLegalForm': 'AS', 'cbc:RegistrationName': 'Acme AS' },
            'cbc:EndpointID': { '#text': 'john@acme.no', '@schemeID': 'EM' },
          },
        },
        'cac:AccountingSupplierParty'
      )
    );

    expect(result).toEqual({
      contact: { electronicMail: 'jane@acme.no', name: 'Jane', telephone: '+4712345678' },
      endpointId: { id: 'john@acme.no', schemeId: '00EM' },
      partyIdentification: { id: 'PI-1' },
      partyLegalEntity: { companyId: { id: 'C-1' }, companyLegalForm: 'AS', registrationName: 'Acme AS' },
    });
  });

  it('decodes a present party without legal entity or contact to undefined fields', () => {
    const result = Effect.runSync(decodeInvoiceMessageParty({ 'cac:AccountingSupplierParty': {} }, 'cac:AccountingSupplierParty'));

    expect(result).toEqual({ contact: undefined, endpointId: undefined, partyIdentification: undefined, partyLegalEntity: undefined });
  });
});
