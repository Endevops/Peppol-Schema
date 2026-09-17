import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolCountryCodeValue } from '#/schemas/values/peppol-country-code-schema.ts';

/**
 * @description An additional address line that supplements the main address line. Wraps the `cac:AddressLine` element, whose `cbc:Line` value carries the text.
 *
 * @example
 *   ```ts
 *   { line: 'Building 23' }
 *   ```;
 *
 * @see {@link PeppolAddress}
 */
export class PeppolAddressLine extends opaque<PeppolAddressLine>()(
  Schema.Struct({
    /**
     * @description An additional address line in an address that can be used to give further details supplementing the main line.
     *
     * @summary Address line 3
     *
     * @name `cbc:Line`
     */
    line: Schema.String,
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description The country of an address, expressed as a two-letter ISO 3166-1 alpha-2 code. Wraps the `cac:Country` element and its `cbc:IdentificationCode`.
 *
 * @example
 *   ```ts
 *   { identificationCode: 'GB' }
 *   ```;
 *
 * @see {@link PeppolAddress}
 */
export class PeppolCountryCode extends opaque<PeppolCountryCode>()(
  Schema.Struct({
    /**
     * @description A code that identifies the country.
     *
     * @example
     *   GB;
     *
     * @summary Country code
     *
     * @name `cbc:IdentificationCode`
     */
    identificationCode: PeppolCountryCodeValue,
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description The postal address of a party, used for the seller, buyer, payee and delivery locations. Carries the street lines, city, postal zone, country
 * subdivision, country code and optional additional address lines.
 *
 * @summary Postal address
 *
 * @name `cac:PostalAddress`
 */
export class PeppolAddress extends opaque<PeppolAddress>()(
  Schema.Struct({
    /**
     * @description The main address line in an address.
     *
     * @example
     *   Main Street 1
     *
     * @summary Address line 1
     *
     * @name `cbc:StreetName`
     */
    streetName: Schema.optional(Schema.String),
    /**
     * @description An additional address line in an address that can be used to give further details supplementing the main line.
     *
     * @example
     *   Po Box 351
     *
     * @summary Address line 2
     *
     * @name `cbc:AdditionalStreetName`
     */
    additionalStreetName: Schema.optional(Schema.String),
    /**
     * @description The common name of the city, town or village, where the address is located.
     *
     * @example
     *   London;
     *
     * @summary Seller city
     *
     * @name `cbc:CityName`
     */
    cityName: Schema.optional(Schema.String),
    /**
     * @description The identifier for an addressable group of properties according to the relevant postal service.
     *
     * @example
     *   W1G 8LZ
     *
     * @summary post code
     *
     * @name `cbc:PostalZone`
     */
    postalZone: Schema.optional(Schema.String),
    /**
     * @description The subdivision of a country.
     *
     * @example
     *   Region A
     *
     * @summary Seller country subdivision
     *
     * @name `cbc:CountrySubentity`
     */
    countrySubentity: Schema.optional(Schema.String),
    /**
     * @example
     *   GB;
     *
     * @name `cac:Country`
     */
    countryCode: PeppolCountryCode,
    /**
     * @example
     *   Building 23
     *
     * @name `cac:AddressLine`
     */
    addressLine: Schema.optional(PeppolAddressLine),
  }).pipe(Schema.toStandardSchemaV1)
) {}
