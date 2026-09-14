// oxlint-disable vitest/expect-expect
import { describe, it } from 'vitest';

import { decoding } from '#/test/schema-asserts';

import { PeppolTaxRepresentative } from './peppol-tax-representative-schema';

const validTaxRepresentative = {
  name: 'Tax Rep',
  postalAddress: { cityName: 'Paris', countryCode: { identificationCode: 'FR' } },
  partyTaxScheme: { companyId: 'FR123456789', taxSchemeId: { id: 'VAT' } },
};

describe('PeppolTaxRepresentative', () => {
  const decode = decoding(PeppolTaxRepresentative);

  it('should parse a tax representative', async () => {
    await decode.succeed(validTaxRepresentative);
  });

  it('should default the party tax scheme id to VAT', async () => {
    await decode.succeed(
      { ...validTaxRepresentative, partyTaxScheme: { companyId: 'FR123456789', taxSchemeId: {} } },
      { ...validTaxRepresentative, partyTaxScheme: { companyId: 'FR123456789', taxSchemeId: { id: 'VAT' } } }
    );
  });

  it('should reject a missing name', async () => {
    const { name: _name, ...rest } = validTaxRepresentative;
    await decode.fail(rest, 'Missing key\n  at ["name"]');
  });

  it('should reject a missing postalAddress', async () => {
    await decode.fail({ name: 'Tax Rep', partyTaxScheme: validTaxRepresentative.partyTaxScheme }, 'Missing key\n  at ["postalAddress"]');
  });

  it('should reject a missing partyTaxScheme', async () => {
    await decode.fail({ name: 'Tax Rep', postalAddress: validTaxRepresentative.postalAddress }, 'Missing key\n  at ["partyTaxScheme"]');
  });
});
