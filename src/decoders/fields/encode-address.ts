import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolAddress } from '#/schemas/fields/address-schema';

export function encodeAddress(address?: PeppolAddress): XmlNode {
  if (!address) return undefined;
  return {
    'cbc:StreetName': address.streetName,
    'cbc:AdditionalStreetName': address.additionalStreetName,
    'cbc:CityName': address.cityName,
    'cbc:PostalZone': address.postalZone,
    'cbc:CountrySubentity': address.countrySubentity,
    'cac:AddressLine': address.addressLine?.line ? { 'cbc:Line': address.addressLine.line } : undefined,
    'cac:Country': { 'cbc:IdentificationCode': address.countryCode.identificationCode },
  };
}
