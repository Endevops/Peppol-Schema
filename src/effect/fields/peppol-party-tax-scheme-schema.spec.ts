// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolPartyTaxSchemeSchema } from './peppol-party-tax-scheme-schema';

describe('peppolPartyTaxSchemeSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolPartyTaxSchemeSchema);
  const decode = testSchema.decoding();

  it('should parse a party tax scheme', async () => {
    await decode.succeed({ companyId: 'GB123456789', taxSchemeId: { id: 'VAT' } });
  });

  it('should default the tax scheme id to VAT', async () => {
    await decode.succeed({ companyId: 'GB123456789', taxSchemeId: {} }, { companyId: 'GB123456789', taxSchemeId: { id: 'VAT' } });
  });

  it('should reject a missing companyId', async () => {
    await decode.fail({ taxSchemeId: {} }, 'Missing key\n  at ["companyId"]');
  });

  it('should reject a missing taxSchemeId', async () => {
    await decode.fail({ companyId: 'GB123456789' }, 'Missing key\n  at ["taxSchemeId"]');
  });
});
