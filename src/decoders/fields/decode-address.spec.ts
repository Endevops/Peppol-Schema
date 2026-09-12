import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeAddress } from './decode-address';

const fullAddress = {
  'cac:Address': {
    'cac:AddressLine': { 'cbc:Line': 'c/o John' },
    'cac:Country': { 'cbc:IdentificationCode': 'NO' },
    'cbc:AdditionalStreetName': 'Block 4',
    'cbc:CityName': 'Oslo',
    'cbc:CountrySubentity': 'Oslo County',
    'cbc:PostalZone': '0150',
    'cbc:StreetName': 'Main St',
  },
};

describe('decodeAddress', () => {
  it('returns undefined when the address path is missing', () => {
    const result = Effect.runSync(decodeAddress({}, 'cac:Address'));

    expect(result).toBeUndefined();
  });

  it('decodes a fully populated address node', () => {
    const result = Effect.runSync(decodeAddress(fullAddress, 'cac:Address'));

    expect(result).toEqual({
      additionalStreetName: 'Block 4',
      addressLine: { line: 'c/o John' },
      cityName: 'Oslo',
      countryCode: { identificationCode: 'NO' },
      countrySubentity: 'Oslo County',
      postalZone: '0150',
      streetName: 'Main St',
    });
  });

  it('decodes address without country, address line, or street name to undefined fields', () => {
    const result = Effect.runSync(decodeAddress({ 'cac:Address': { 'cbc:CityName': 'Oslo' } }, 'cac:Address'));

    expect(result).toEqual({
      additionalStreetName: undefined,
      addressLine: undefined,
      cityName: 'Oslo',
      countryCode: undefined,
      countrySubentity: undefined,
      postalZone: undefined,
      streetName: undefined,
    });
  });
});
