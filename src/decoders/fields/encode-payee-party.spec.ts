import { describe, it, expect } from 'vitest';

import { encodePayeeParty } from './encode-payee-party';

describe('encodePayeeParty', () => {
  it('returns undefined when payee party is missing', () => {
    // ❌ Negative: undefined payee party → undefined.
    expect(encodePayeeParty(undefined)).toBeUndefined();
  });

  it('encodes a payee party with only a name', () => {
    // ❌ Negative: partyLegalEntity and partyIdentification are absent.
    expect(encodePayeeParty({ partyName: { name: 'Payee Ltd' } })).toEqual({
      'cac:PartyIdentification': undefined,
      'cac:PartyName': { 'cbc:Name': 'Payee Ltd' },
      'cac:PartyLegalEntity': undefined,
    });
  });

  it('encodes a payee party with legal entity and identification', () => {
    // ✅ Positive: companyId and identification id are both present.
    expect(
      encodePayeeParty({
        partyName: { name: 'Payee Ltd' },
        partyLegalEntity: { companyId: { id: 'FR932874294' } },
        partyIdentification: { id: { id: 'SEPA-42' } },
      })
    ).toEqual({
      'cac:PartyIdentification': { 'cbc:ID': 'SEPA-42' },
      'cac:PartyName': { 'cbc:Name': 'Payee Ltd' },
      'cac:PartyLegalEntity': { 'cbc:CompanyId': 'FR932874294' },
    });
  });

  it('omits company id when party legal entity has no company id', () => {
    // ❌ Negative: partyLegalEntity present but companyId absent.
    expect(encodePayeeParty({ partyName: { name: 'Payee Ltd' }, partyLegalEntity: {} })?.['cac:PartyLegalEntity']).toEqual({
      'cbc:CompanyId': undefined,
    });
  });

  it('omits identification id when party identification has no id', () => {
    // ❌ Negative: partyIdentification present but id absent.
    expect(encodePayeeParty({ partyName: { name: 'Payee Ltd' }, partyIdentification: {} })?.['cac:PartyIdentification']).toEqual({
      'cbc:ID': undefined,
    });
  });
});
