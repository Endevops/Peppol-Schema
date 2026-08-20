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

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('payment-means-codes', () => {
    it.each(paymentMeansCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(paymentMeansCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
