/**
 * @description ISO 3166-1 alpha-2 country codes with additional entries These codes identify countries and territories worldwide.
 *
 * @module effect/values/country-code
 *
 * @see https://www.iso.org/iso-3166-country-codes.html
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO3166/
 */

import { Schema } from 'effect';

import { countryCodesKeys } from '#/values/country-code.generated';

/**
 * @description A two character ISO 3166-1 alpha-2 country code from the PEPPOL codelist. The literal union enforces the length.
 *
 * @example
 *   ```ts
 *   'AD';
 *   ```;
 *
 * @validations
 * - BR-CL-14 / BR-CL-15: Country code MUST be a valid ISO 3166-1 alpha-2 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO3166/
 * @see {@link countryCodesKeys}
 */
export class PeppolCountryCodeValue extends Schema.Literals(countryCodesKeys).pipe(
  Schema.brand('PeppolCountryCodeValue'),
  Schema.toStandardSchemaV1
) {}
