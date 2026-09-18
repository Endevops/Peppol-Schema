/**
 * @module effect/values/payment-means-codes-schema
 *
 * Payment means codes as defined by UN/CEFACT UNCL4461.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4461/
 */

import { Schema } from 'effect';

import { paymentMeansCodesKeys } from '#/values/payment-means-codes.generated';

/**
 * @description A payment means code from the PEPPOL subset of UNCL 4461.
 *
 * @example
 *   ```ts
 *   '1';
 *   ```;
 *
 * @validations
 * - BR-CL-16: Payment means code MUST be a valid UNCL 4461 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4461/
 * @see {@link paymentMeansCodesKeys}
 */
export const PeppolPaymentMeansCodeValue = Schema.Literals(paymentMeansCodesKeys).pipe(
  Schema.brand('PeppolPaymentMeansCodeValue'),
  Schema.toStandardSchemaV1
);

/**
 * @description Decoded form of {@link PeppolPaymentMeansCodeValue}.
 */
export type PeppolPaymentMeansCodeValue = Schema.Schema.Type<typeof PeppolPaymentMeansCodeValue>;
