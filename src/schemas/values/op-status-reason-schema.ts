import { Schema } from 'effect';

import { opStatusReasonKeys } from '#/values/op-status-reason.generated';

/**
 * @description An OpenPeppol operation status reason code from the OPStatusReason codelist.
 *
 * @example
 *   ```ts
 *   'NON';
 *   ```;
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/OPStatusReason/
 * @see {@link opStatusReasonKeys}
 */
export const PeppolOpStatusReason = Schema.Literals(opStatusReasonKeys).pipe(Schema.brand('PeppolOpStatusReason'), Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolOpStatusReason}.
 */
export type PeppolOpStatusReason = Schema.Schema.Type<typeof PeppolOpStatusReason>;
