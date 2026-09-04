/**
 * @module effect/values/payment-means-codes-schema
 *
 * Payment means codes as defined by UN/CEFACT UNCL4461.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4461/
 */

import { Schema } from 'effect';

import type { PaymentMeansCodesKeys } from '#/values/payment-means-codes.generated';

import { paymentMeansCodesKeys } from '#/values/payment-means-codes.generated';

/**
 * @description A payment means code as defined by the PEPPOL subset of UNCL 4461.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4461/
 */
export type PeppolPaymentMeansCode = PaymentMeansCodesKeys;

/**
 * @description Validates a payment means code against the PEPPOL subset of UNCL 4461.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid payment means codes.
 *
 * @validations
 * - BR-CL-16: Payment means code MUST be a valid UNCL 4461 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4461/
 */
export function paymentMeansCodeSchema(error?: string) {
  const schema = Schema.Literals(paymentMeansCodesKeys);
  return error === undefined ? schema : schema.annotate({ message: error });
}
