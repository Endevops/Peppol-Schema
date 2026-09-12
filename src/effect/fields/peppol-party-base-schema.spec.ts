// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolPartyBaseSchema } from './peppol-party-base-schema';

const validParty = {
  endpointId: { id: '7300010000001', schemeId: '0088' },
  postalAddress: { cityName: 'London', countryCode: { identificationCode: 'GB' } },
  partyLegalEntity: { registrationName: 'Seller Ltd' },
};

describe('peppolPartyBaseSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolPartyBaseSchema);
  const decode = testSchema.decoding();

  it('should parse a minimal party', async () => {
    await decode.succeed(validParty);
  });

  it('should parse with all optional fields', async () => {
    await decode.succeed({
      ...validParty,
      partyIdentification: { id: { id: '5060012349998', schemeId: '0088' } },
      partyName: { name: 'Trading Name' },
      partyTaxSchemes: [{ companyId: 'GB123', taxSchemeId: { id: 'VAT' } }],
      contact: { name: 'John', telephone: '123', electronicMail: 'john@example.com' },
    });
  });

  it('should reject a missing endpointId', async () => {
    await decode.fail({ postalAddress: validParty.postalAddress, partyLegalEntity: validParty.partyLegalEntity }, 'Missing key\n  at ["endpointId"]');
  });

  it('should reject a missing postalAddress', async () => {
    await decode.fail({ endpointId: validParty.endpointId, partyLegalEntity: validParty.partyLegalEntity }, 'Missing key\n  at ["postalAddress"]');
  });

  it('should reject more than two partyTaxSchemes', async () => {
    await decode.fail(
      {
        ...validParty,
        partyTaxSchemes: [
          { companyId: '1', taxSchemeId: {} },
          { companyId: '2', taxSchemeId: {} },
          { companyId: '3', taxSchemeId: {} },
        ],
      },
      'Expected a value with a length of at most 2\n  at ["partyTaxSchemes"]'
    );
  });
});
