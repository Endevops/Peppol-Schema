import { describe, expect, it } from 'vitest';

import { chargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';

import { chargeReasonCodeSchema } from './charge-reason-code';

describe('charge-reason-code', () => {
  it.each(chargeReasonCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(chargeReasonCodeSchema().parse(value)).toEqual(expected);
  });
});
