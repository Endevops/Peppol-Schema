import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolAddress } from '#/schemas/fields/peppol-address-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodeAddress = Effect.fn(function* (
  address: XmlNode | undefined,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolAddress> | undefined> {
  const val = yield* getProp(address, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return {
    additionalStreetName: yield* strOrUnd(val, 'cbc:AdditionalStreetName'),
    addressLine: yield* decodeAddressLine(val, 'cac:AddressLine'),
    cityName: yield* strOrUnd(val, 'cbc:CityName'),
    countryCode: yield* decodeCountryCode(val, 'cac:Country'),
    countrySubentity: yield* strOrUnd(val, 'cbc:CountrySubentity'),
    postalZone: yield* strOrUnd(val, 'cbc:PostalZone'),
    streetName: yield* strOrUnd(val, 'cbc:StreetName'),
  };
});

const decodeAddressLine = Effect.fn(function* (
  address: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolAddress['addressLine']> | undefined> {
  const val = yield* getProp(address, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return { line: yield* strOrUnd(val, 'cbc:Line') };
});

const decodeCountryCode = Effect.fn(function* (
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolAddress['countryCode']> | undefined> {
  const country = yield* getProp(node, ...path);
  if (Predicate.isNullish(country)) return undefined;
  return { identificationCode: yield* strOrUnd(country, 'cbc:IdentificationCode') };
});
