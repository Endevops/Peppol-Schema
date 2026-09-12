import { Schema } from 'effect';

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
 * @returns An Effect schema that accepts only valid allowance/charge reason codes.
 *
 * @validations
 * - PEPPOL-EN16931-CL002: Document allowance reason code MUST be according to the subset of UNCL 5189 D.16B.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL5189/
 */
export const allowanceChargeReasonCodeSchema = Schema.Literals(allowanceChargeReasonCodesKeys).annotate({
  documentation: 'PEPPOL-EN16931-CL002: Reason code MUST be according to subset of UNCL 5189 D.16B.',
});
