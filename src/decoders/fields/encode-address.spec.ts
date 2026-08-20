import { describe, it, expect } from 'vitest';

import { encodeAddress } from './encode-address';

describe('encodeAddress', () => {
  it('returns undefined when address is missing', () => {
    // ❌ Negative: no address input must not crash and returns undefined.
    expect(encodeAddress(undefined)).toBeUndefined();
  });

  it('encodes a fully present address', () => {
    // ✅ Positive: every optional field is encoded to its XML key.
    expect(
      encodeAddress({
        streetName: 'Main Street 1',
        additionalStreetName: 'Po Box 351',
        cityName: 'London',
        postalZone: 'W1G 8LZ',
        countrySubentity: 'Region A',
        countryCode: { identificationCode: 'GB' },
        addressLine: { line: 'Building 23' },
      })
    ).toEqual({
      'cbc:StreetName': 'Main Street 1',
      'cbc:AdditionalStreetName': 'Po Box 351',
      'cbc:CityName': 'London',
      'cbc:PostalZone': 'W1G 8LZ',
      'cbc:CountrySubentity': 'Region A',
      'cac:AddressLine': { 'cbc:Line': 'Building 23' },
      'cac:Country': { 'cbc:IdentificationCode': 'GB' },
    });
  });

  it('omits the address line when addressLine is absent', () => {
    // ❌ Negative: address present but without addressLine → no cac:AddressLine.
    expect(encodeAddress({ countryCode: { identificationCode: 'GB' } })?.['cac:AddressLine']).toBeUndefined();
  });
});
