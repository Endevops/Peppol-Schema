import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolAddress } from '#/schemas/fields/address-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeAddress(address: XmlNode | undefined, ...path: Array<string>): RecursivePartial<PeppolAddress> | undefined {
  const val = getProp(address, ...path);
  if (!val) return undefined;
  return {
    additionalStreetName: strOrUnd(val, 'cbc:AdditionalStreetName'),
    addressLine: decodeAddressLine(val, 'cac:AddressLine'),
    cityName: strOrUnd(val, 'cbc:CityName'),
    countryCode: decodeCountryCode(val, 'cac:Country'),
    countrySubentity: strOrUnd(val, 'cbc:CountrySubentity'),
    postalZone: strOrUnd(val, 'cbc:PostalZone'),
    streetName: strOrUnd(val, 'cbc:StreetName'),
  };
}

function decodeAddressLine(address: XmlNode, ...path: Array<string>): RecursivePartial<PeppolAddress['addressLine']> | undefined {
  const val = getProp(address, ...path);
  if (!val) return undefined;
  return { line: strOrUnd(val, 'cbc:Line') };
}

function decodeCountryCode(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolAddress['countryCode']> | undefined {
  const country = getProp(node, ...path);
  if (!country) return undefined;
  return { identificationCode: strOrUnd(country, 'cbc:IdentificationCode') };
}
