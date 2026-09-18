/**
 * @description Currency codes as defined by ISO 4217.
 *
 * @see https://www.iso.org/iso-4217-currency-codes.html
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO4217/
 */

import { Schema } from 'effect';

import { currencyCodesKeys } from '#/values/currency-code.generated';

/**
 * @description An ISO 4217 currency code from the PEPPOL codelist.
 *
 * @example
 *   ```ts
 *   'AED';
 *   ```;
 *
 * @validations
 * - PEPPOL-EN16931-CL007: Currency codes MUST be valid ISO 4217 codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO4217/
 * @see {@link currencyCodesKeys}
 */
export const PeppolCurrencyCode = Schema.Literals(currencyCodesKeys).pipe(Schema.brand('PeppolCurrencyCode'), Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolCurrencyCode}.
 */
export type PeppolCurrencyCode = Schema.Schema.Type<typeof PeppolCurrencyCode>;

/**
 * @description An ISO 4217 currency code as defined by the PEPPOL subset.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO4217/
 */
export type PeppolCurrencyCodeEncoded = Schema.Codec.Encoded<typeof PeppolCurrencyCode>;
