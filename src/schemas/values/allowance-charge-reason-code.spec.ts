import { describe, expect, it } from 'vitest';

import { allowanceChargeReasonCodesKeys } from '#/values/allowance-charge-reason-codes.generated';

import { allowanceChargeReasonCodeSchema } from './allowance-charge-reason-code';

describe('allowance-charge-reason-code', () => {
  it.each(allowanceChargeReasonCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(allowanceChargeReasonCodeSchema().parse(value)).toEqual(expected);
  });
});
