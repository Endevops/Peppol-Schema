import { describe, expect, it } from 'vitest';

import { decodePayeeParty } from './decode-payee-party';

describe('decodePayeeParty', () => {
  it('returns undefined when the payee party path is missing', () => {
    const result = decodePayeeParty({}, 'cac:PayeeParty');

    expect(result).toBeUndefined();
  });

  it('decodes a fully populated payee party node', () => {
    const result = decodePayeeParty(
      {
        'cac:PayeeParty': {
          'cac:PartyIdentification': { 'cbc:ID': 'PAYEE-1' },
          'cac:PartyLegalEntity': { 'cbc:CompanyID': 'COMP-1' },
          'cac:PartyName': { 'cbc:Name': 'Acme Payee' },
        },
      },
      'cac:PayeeParty'
    );

    expect(result).toEqual({
      partyIdentification: { id: { id: 'PAYEE-1' } },
      partyLegalEntity: { companyId: { id: 'COMP-1' } },
      partyName: { name: 'Acme Payee' },
    });
  });

  it('decodes sub-parts to undefined when they are absent', () => {
    const result = decodePayeeParty({ 'cac:PayeeParty': {} }, 'cac:PayeeParty');

    expect(result).toEqual({ partyIdentification: undefined, partyLegalEntity: undefined, partyName: undefined });
  });
});
