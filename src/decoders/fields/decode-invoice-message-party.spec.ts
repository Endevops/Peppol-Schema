import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeInvoiceMessageParty } from './decode-invoice-message-party.ts';

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
            'cac:PartyIdentification': { 'cbc:ID': 'PI-1' },
            'cac:PartyLegalEntity': { 'cbc:RegistrationName': 'Acme AS' },
            'cbc:EndpointID': { '#text': 'john@acme.no', '@schemeID': 'EM' },
          },
        },
        'cac:AccountingSupplierParty'
      )
    );

    expect(result).toEqual({
      endpointId: { id: 'john@acme.no', schemeId: '00EM' },
      partyIdentification: { id: 'PI-1' },
      partyLegalEntity: { registrationName: 'Acme AS' },
    });
  });
});
