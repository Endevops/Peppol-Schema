import { Effect } from 'effect';
import { describe, it, expect } from 'vitest';

import { encodeAddress } from './encode-address';

describe('encodeAddress', () => {
  it('returns undefined when address is missing', () => {
    // ❌ Negative: no address input must not crash and returns undefined.
    expect(Effect.runSync(encodeAddress(undefined))).toBeUndefined();
  });

  it('encodes a fully present address', () => {
    // ✅ Positive: every optional field is encoded to its XML key.
    expect(
      Effect.runSync(
        encodeAddress({
          additionalStreetName: 'Po Box 351',
          addressLine: { line: 'Building 23' },
          cityName: 'London',
          countryCode: { identificationCode: 'GB' },
          countrySubentity: 'Region A',
          postalZone: 'W1G 8LZ',
          streetName: 'Main Street 1',
        })
      )
    ).toEqual({
      'cac:AddressLine': { 'cbc:Line': 'Building 23' },
      'cac:Country': { 'cbc:IdentificationCode': 'GB' },
      'cbc:AdditionalStreetName': 'Po Box 351',
      'cbc:CityName': 'London',
      'cbc:CountrySubentity': 'Region A',
      'cbc:PostalZone': 'W1G 8LZ',
      'cbc:StreetName': 'Main Street 1',
    });
  });

  it('omits the address line when addressLine is absent', () => {
    // ❌ Negative: address present but without addressLine → no cac:AddressLine.
    expect(Effect.runSync(encodeAddress({ countryCode: { identificationCode: 'GB' } }))?.['cac:AddressLine']).toBeUndefined();
  });
});
