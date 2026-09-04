import { Schema } from 'effect';

import { countryCodeSchema } from '#/effect/values/country-code';

/**
 * @summary Postal address
 *
 * @name `cac:PostalAddress`
 */
export const addressSchema = Schema.Struct({
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
  streetName: Schema.optionalKey(Schema.String),
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
  additionalStreetName: Schema.optionalKey(Schema.String),
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
  cityName: Schema.optionalKey(Schema.String),
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
  postalZone: Schema.optionalKey(Schema.String),
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
  countrySubentity: Schema.optionalKey(Schema.String),
  /**
   * @example
   *   GB;
   *
   * @name `cac:Country`
   */
  countryCode: Schema.Struct({
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
    identificationCode: countryCodeSchema,
  }),
  /**
   * @example
   *   Building 23
   *
   * @name `cac:AddressLine`
   */
  addressLine: Schema.optionalKey(
    Schema.Struct({
      /**
       * @description An additional address line in an address that can be used to give further details supplementing the main line.
       *
       * @summary Address line 3
       *
       * @name `cbc:Line`
       */
      line: Schema.String,
    })
  ),
});

export type PeppolAddress = typeof addressSchema.Type;
