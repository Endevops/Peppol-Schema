import * as z from 'zod/mini';

import type { allowanceChargeReasonCodesKey } from '#/values/allowance-charge-reason-codes.generated';

import { allowanceChargeReasonCodesKeys } from '#/values/allowance-charge-reason-codes.generated';

export type AllowanceChargeReasonCode = allowanceChargeReasonCodesKey;

export function allowanceChargeReasonCodeSchema(error?: string) {
  // validate against PEPPOL-EN16931-CL002: Reason code MUST be according to subset of UNCL 5189 D.16B.
  return z.enum(allowanceChargeReasonCodesKeys, error);
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('allowance-charge-reason-code', () => {
    it.each(allowanceChargeReasonCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(allowanceChargeReasonCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
