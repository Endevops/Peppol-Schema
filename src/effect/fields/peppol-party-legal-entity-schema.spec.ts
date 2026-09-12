// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolPartyLegalEntitySchema } from './peppol-party-legal-entity-schema';

describe('peppolPartyLegalEntitySchema', () => {
  const testSchema = new TestSchema.Asserts(peppolPartyLegalEntitySchema);
  const decode = testSchema.decoding();

  it('should parse with only a registrationName', async () => {
    await decode.succeed({ registrationName: 'Seller Ltd' });
  });

  it('should parse with optional companyId and companyLegalForm', async () => {
    await decode.succeed({ registrationName: 'Seller Ltd', companyId: { id: '987654321', schemeId: '0088' }, companyLegalForm: 'Share capital' });
  });

  it('should reject a missing registrationName', async () => {
    await decode.fail({}, 'Missing key\n  at ["registrationName"]');
  });

  it('should reject a companyId without an id', async () => {
    await decode.fail({ registrationName: 'Seller Ltd', companyId: {} }, 'Missing key\n  at ["companyId"]["id"]');
  });
});
