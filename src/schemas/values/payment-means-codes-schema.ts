/**
 * @description Payment means codes as defined by UN/CEFACT UNCL4461.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4461/
 */
import * as z from 'zod/mini';

import type { paymentMeansCodesKey } from '#/values/payment-means-codes.generated';

import { paymentMeansCodesKeys } from '#/values/payment-means-codes.generated';

export type PaymentMeansCode = paymentMeansCodesKey;

export function paymentMeansCodeSchema(error?: string) {
  return z.string().check(z.refine(val => paymentMeansCodesKeys.includes(val as PaymentMeansCode), error));
}
