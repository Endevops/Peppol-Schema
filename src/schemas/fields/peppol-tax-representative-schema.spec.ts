// oxlint-disable vitest/expect-expect
import { describe, it } from 'vite-plus/test';

import type { PeppolCountryCodeValue } from '#/schemas/values/peppol-country-code-schema.ts';

import { decoding } from '#/test/schema-asserts.ts';

import { PeppolTaxRepresentative } from './peppol-tax-representative-schema.ts';

const validTaxRepresentative = {
  partyName: { name: 'Tax Rep' },
  postalAddress: { cityName: 'Paris', countryCode: { identificationCode: 'FR' as typeof PeppolCountryCodeValue.Type } },
  partyTaxScheme: { companyId: 'FR123456789', taxSchemeId: { id: 'VAT' } },
} satisfies PeppolTaxRepresentative;

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

  it('should reject a missing partyName', async () => {
    const { partyName: _name, ...rest } = validTaxRepresentative;
    await decode.fail(rest, 'Missing key\n  at ["partyName"]');
  });

  it('should reject a missing postalAddress', async () => {
    await decode.fail({ name: 'Tax Rep', partyTaxScheme: validTaxRepresentative.partyTaxScheme }, 'Missing key\n  at ["partyName"]');
  });

  it('should reject a missing partyTaxScheme', async () => {
    await decode.fail({ name: 'Tax Rep', postalAddress: validTaxRepresentative.postalAddress }, 'Missing key\n  at ["partyName"]');
  });
});
