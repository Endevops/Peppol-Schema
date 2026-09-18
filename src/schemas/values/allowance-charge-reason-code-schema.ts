import { Schema } from 'effect';

import { allowanceChargeReasonCodesKeys } from '#/values/allowance-charge-reason-codes.generated';

/**
 * @description An allowance or charge reason code from the PEPPOL subset of UNCL 5189 (D.16B).
 *
 * @example
 *   ```ts
 *   '41';
 *   ```;
 *
 * @validations
 * - PEPPOL-EN16931-CL002: Document allowance reason code MUST be according to the subset of UNCL 5189 D.16B.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL5189/
 * @see {@link allowanceChargeReasonCodesKeys}
 */
export const PeppolAllowanceChargeReasonCode = Schema.Literals(allowanceChargeReasonCodesKeys)
  .pipe(Schema.brand('PeppolAllowanceChargeReasonCode'))
  .annotate({ documentation: 'PEPPOL-EN16931-CL002: Reason code MUST be according to subset of UNCL 5189 D.16B.' })
  .pipe(Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolAllowanceChargeReasonCode}.
 */
export type PeppolAllowanceChargeReasonCode = Schema.Schema.Type<typeof PeppolAllowanceChargeReasonCode>;
