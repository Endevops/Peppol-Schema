/**
 * @module schemas/values/payment-means-codes-schema
 *
 * Payment means codes as defined by UN/CEFACT UNCL4461.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4461/
 */

import * as z from 'zod/mini';

import type { PaymentMeansCodesKeys } from '#/values/payment-means-codes.generated';

import { paymentMeansCodesKeys } from '#/values/payment-means-codes.generated';

export type PeppolPaymentMeansCode = PaymentMeansCodesKeys;

export function paymentMeansCodeSchema(error?: string) {
  return z.string().check(z.refine(val => paymentMeansCodesKeys.includes(val as (typeof paymentMeansCodesKeys)[number]), error));
}
