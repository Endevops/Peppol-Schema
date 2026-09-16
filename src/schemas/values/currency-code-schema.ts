/**
 * @description Currency codes as defined by ISO 4217.
 *
 * @see https://www.iso.org/iso-4217-currency-codes.html
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO4217/
 */

import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { currencyCodesKeys } from '#/values/currency-code.generated';

/**
 * @description Validates an ISO 4217 currency code against the PEPPOL codelist.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid currency codes.
 *
 * @validations
 * - PEPPOL-EN16931-CL007: Currency codes MUST be valid ISO 4217 codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO4217/
 */
export class PeppolCurrencyCode extends opaque<PeppolCurrencyCode>()(Schema.Literals(currencyCodesKeys).pipe(Schema.brand('PeppolCurrencyCode'))) {}

/**
 * @description An ISO 4217 currency code as defined by the PEPPOL subset.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO4217/
 */
export type PeppolCurrencyCodeEncoded = Schema.Codec.Encoded<typeof PeppolCurrencyCode>;
