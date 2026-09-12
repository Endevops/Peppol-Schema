// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolPayeePartySchema } from './peppol-payee-party-schema';

describe('peppolPayeePartySchema', () => {
  const testSchema = new TestSchema.Asserts(peppolPayeePartySchema);
  const decode = testSchema.decoding();

  it('should parse a party name only', async () => {
    await decode.succeed({ partyName: { name: 'Payee Ltd' } });
  });

  it('should parse with optional party identification and legal entity', async () => {
    await decode.succeed({
      partyName: { name: 'Payee Ltd' },
      partyIdentification: { id: { id: '7300010000001', schemeId: '0088' } },
      partyLegalEntity: { companyId: { id: 'FR932874294', schemeId: '0002' } },
    });
  });

  it('should reject a missing partyName', async () => {
    await decode.fail({}, 'Missing key\n  at ["partyName"]');
  });

  it('should reject a party identification without an id', async () => {
    await decode.fail({ partyName: { name: 'Payee Ltd' }, partyIdentification: { id: {} } }, 'Missing key\n  at ["partyIdentification"]["id"]["id"]');
  });
});
