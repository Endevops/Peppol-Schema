// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vite-plus/test';

import { PeppolPartySchema } from './peppol-party-base-schema.ts';

const validParty = {
  party: {
    endpointId: { id: '7300010000001', schemeId: '0088' },
    postalAddress: { cityName: 'London', countryCode: { identificationCode: 'GB' } },
    partyLegalEntity: { registrationName: 'Seller Ltd' },
  },
} satisfies typeof PeppolPartySchema.Encoded;

describe('PeppolPartyBase', () => {
  const testSchema = new TestSchema.Asserts(PeppolPartySchema);
  const decode = testSchema.decoding();

  it('should parse a minimal party', async () => {
    await decode.succeed(validParty);
  });

  it('should parse with all optional fields', async () => {
    await decode.succeed({
      party: {
        ...validParty.party,
        contact: { electronicMail: 'john@example.com', name: 'John', telephone: '123' },
        partyIdentification: { id: { id: '5060012349998', schemeId: '0088' } },
        partyName: { name: 'Trading Name' },
        partyTaxSchemes: [{ companyId: 'GB123', taxSchemeId: { id: 'VAT' } }],
      },
    });
  });

  it('should reject a missing endpointId', async () => {
    await decode.fail(
      { party: { postalAddress: validParty.party.postalAddress, partyLegalEntity: validParty.party.partyLegalEntity } },
      'Missing key\n  at ["party"]["endpointId"]'
    );
  });

  it('should reject a missing postalAddress', async () => {
    await decode.fail(
      { party: { endpointId: validParty.party.endpointId, partyLegalEntity: validParty.party.partyLegalEntity } },
      'Missing key\n  at ["party"]["postalAddress"]'
    );
  });

  it('should reject more than two partyTaxSchemes', async () => {
    await decode.fail(
      {
        party: {
          ...validParty.party,
          partyTaxSchemes: [
            { companyId: '1', taxSchemeId: {} },
            { companyId: '2', taxSchemeId: {} },
            { companyId: '3', taxSchemeId: {} },
          ],
        },
      },
      'Expected a value with a length of at most 2\n  at ["party"]["partyTaxSchemes"]'
    );
  });
});
