/**
 * @description ISO 3166-1 alpha-2 country codes with additional entries These codes identify countries and territories worldwide.
 *
 * @module schemas/values/country-code
 *
 * @see https://www.iso.org/iso-3166-country-codes.html
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO3166/
 */

import * as z from 'zod/mini';

import type { CountryCodesKeys } from '#/values/country-code.generated';

import { countryCodesKeys } from '#/values/country-code.generated';

/**
 * @description An ISO 3166-1 alpha-2 country code as defined by the PEPPOL subset.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO3166/
 */
export type PeppolCountryCode = CountryCodesKeys;

/**
 * @description Validates a two character ISO 3166-1 alpha-2 country code against the PEPPOL codelist.
 *
 * @returns A Zod string schema that accepts only valid country codes.
 *
 * @validations
 * - BR-CL-14 / BR-CL-15: Country code MUST be a valid ISO 3166-1 alpha-2 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO3166/
 */
export const countryCodeSchema = z.string().check(
  z.length(2),
  z.refine(val => countryCodesKeys.includes(val as never))
);
