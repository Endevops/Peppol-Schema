// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolAddressSchema } from './peppol-address-schema';

describe('peppolAddressSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolAddressSchema);
  const decode = testSchema.decoding();

  it('should parse a minimal address', async () => {
    await decode.succeed({ countryCode: { identificationCode: 'GB' } });
  });

  it('should parse an address with all optional fields', async () => {
    await decode.succeed({
      additionalStreetName: 'Po Box 351',
      addressLine: { line: 'Building 23' },
      cityName: 'London',
      countryCode: { identificationCode: 'GB' },
      countrySubentity: 'Region A',
      postalZone: 'W1G 8LZ',
      streetName: 'Main Street 1',
    });
  });

  it('should reject an address without a country code', async () => {
    await decode.fail({ cityName: 'London' }, 'Missing key\n  at ["countryCode"]');
  });

  it('should reject an address whose country code is missing the identification code', async () => {
    await decode.fail({ countryCode: {} }, 'Missing key\n  at ["countryCode"]["identificationCode"]');
  });

  it('should reject a non-string street name', async () => {
    await decode.fail({ countryCode: { identificationCode: 'GB' }, streetName: 42 }, 'Expected string | undefined\n  at ["streetName"]');
  });
});
