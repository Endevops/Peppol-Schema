import { Schema } from 'effect';

import { chargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';

/**
 * @description A charge reason code from the PEPPOL subset of UNCL 7161 (D.16B).
 *
 * @example
 *   ```ts
 *   'AA';
 *   ```;
 *
 * @validations
 * - PEPPOL-EN16931-CL003: Charge reason code MUST be according to UNCL 7161 D.16B.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL7161/
 * @see {@link chargeReasonCodesKeys}
 */
export const PeppolChargeReasonCode = Schema.Literals(chargeReasonCodesKeys)
  .pipe(Schema.brand('PeppolChargeReasonCode'))
  .annotate({ documentation: 'PEPPOL-EN16931-CL003: Reason code MUST be according to UNCL 7161 D.16B.' })
  .pipe(Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolChargeReasonCode}.
 */
export type PeppolChargeReasonCode = Schema.Schema.Type<typeof PeppolChargeReasonCode>;
