/**
 * @description ISO 3166-1 alpha-2 country codes with additional entries These codes identify countries and territories worldwide.
 *
 * @module effect/values/country-code
 *
 * @see https://www.iso.org/iso-3166-country-codes.html
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO3166/
 */

import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { countryCodesKeys } from '#/values/country-code.generated';

/**
 * @description Validates a two character ISO 3166-1 alpha-2 country code against the PEPPOL codelist. All codes in the codelist are exactly 2 characters, so the
 * literals union implies the length check.
 *
 * @validations
 * - BR-CL-14 / BR-CL-15: Country code MUST be a valid ISO 3166-1 alpha-2 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO3166/
 */
export class PeppolCountryCodeValue extends opaque<PeppolCountryCodeValue>()(
  Schema.Literals(countryCodesKeys).pipe(Schema.brand('PeppolCountryCodeValue'))
) {}
