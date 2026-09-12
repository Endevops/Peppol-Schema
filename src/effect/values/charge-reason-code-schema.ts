import { Schema } from 'effect';

import type { ChargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';

import { chargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';

/**
 * @description A charge reason code as defined by the PEPPOL subset of UNCL 7161.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL7161/
 */
export type PeppolChargeReasonCode = ChargeReasonCodesKeys;

/**
 * @description Validates a charge reason code against the PEPPOL subset of UNCL 7161 (D.16B).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid charge reason codes.
 *
 * @validations
 * - PEPPOL-EN16931-CL003: Charge reason code MUST be according to UNCL 7161 D.16B.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL7161/
 */
export const chargeReasonCodeSchema = Schema.Literals(chargeReasonCodesKeys).annotate({
  documentation: 'PEPPOL-EN16931-CL003: Reason code MUST be according to UNCL 7161 D.16B.',
});
