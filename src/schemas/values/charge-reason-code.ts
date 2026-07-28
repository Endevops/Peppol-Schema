import * as z from 'zod/mini';

import { chargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';

export function chargeReasonCodeSchema(error?: string) {
  // validate against PEPPOL-EN16931-CL003: Reason code MUST be according to UNCL 7161 D.16B.
  return z.enum(chargeReasonCodesKeys, error);
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('charge-reason-code', () => {
    it.each(chargeReasonCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(chargeReasonCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
