import * as z from 'zod/mini';

import type { AllowanceChargeReasonCodesKeys } from '#/values/allowance-charge-reason-codes.generated';

import { allowanceChargeReasonCodesKeys } from '#/values/allowance-charge-reason-codes.generated';

/**
 * @description An allowance or charge reason code as defined by the PEPPOL subset of UNCL 5189.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL5189/
 */
export type PeppolAllowanceChargeReasonCode = AllowanceChargeReasonCodesKeys;

/**
 * @description Validates an allowance or charge reason code against the PEPPOL subset of UNCL 5189 (D.16B).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid allowance/charge reason codes.
 *
 * @validations
 * - PEPPOL-EN16931-CL002: Document allowance reason code MUST be according to the subset of UNCL 5189 D.16B.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL5189/
 */
export function allowanceChargeReasonCodeSchema(error?: string) {
  // validate against PEPPOL-EN16931-CL002: Reason code MUST be according to subset of UNCL 5189 D.16B.
  return z.string(error).check(z.refine(val => allowanceChargeReasonCodesKeys.includes(val), error));
}
