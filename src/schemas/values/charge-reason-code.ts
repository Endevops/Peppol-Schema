import * as z from 'zod/mini';

import type { ChargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';

import { chargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';

export type PeppolChargeReason = ChargeReasonCodesKeys;

export function chargeReasonCodeSchema(error?: string) {
  // validate against PEPPOL-EN16931-CL003: Reason code MUST be according to UNCL 7161 D.16B.
  return z.string(error).check(z.refine(val => chargeReasonCodesKeys.includes(val as never), error));
}
