/**
 * @description ISO 3166-1 alpha-2 country codes with additional entries These codes identify countries and territories worldwide.
 *
 * @module schemas/values/country-code
 *
 * @see https://www.iso.org/iso-3166-country-codes.html
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO3166/
 */
import * as z from 'zod/mini';

import type { countryCodesKey } from '#/values/country-code.generated';

import { countryCodesKeys } from '#/values/country-code.generated';

export type PeppolCountryCode = countryCodesKey;

export const countryCodeSchema = z.string().check(
  z.length(2),
  z.refine(val => countryCodesKeys.includes(val as PeppolCountryCode))
);
