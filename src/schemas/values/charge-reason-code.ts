import * as z from 'zod/mini';

import type { ChargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';

import { chargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';

/**
 * @description A charge reason code as defined by the PEPPOL subset of UNCL 7161.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL7161/
 */
export type PeppolChargeReason = ChargeReasonCodesKeys;

/**
 * @description Validates a charge reason code against the PEPPOL subset of UNCL 7161 (D.16B).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid charge reason codes.
 *
 * @validations
 * - PEPPOL-EN16931-CL003: Charge reason code MUST be according to UNCL 7161 D.16B.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL7161/
 */
export function chargeReasonCodeSchema(error?: string) {
  // validate against PEPPOL-EN16931-CL003: Reason code MUST be according to UNCL 7161 D.16B.
  return z.string(error).check(z.refine(val => chargeReasonCodesKeys.includes(val as never), error));
}
