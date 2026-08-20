import { describe, expect, it } from 'vitest';

import { paymentMeansCodesKeys } from '#/values/payment-means-codes.generated';

import { paymentMeansCodeSchema } from './payment-means-codes-schema';

describe('payment-means-codes', () => {
  it.each(paymentMeansCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(paymentMeansCodeSchema().parse(value)).toEqual(expected);
  });
});
