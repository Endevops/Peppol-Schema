import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
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
export class PeppolOpStatusReason extends opaque<PeppolOpStatusReason>()(
  Schema.Literals(opStatusReasonKeys).pipe(Schema.brand('PeppolOpStatusReason'), Schema.toStandardSchemaV1)
) {}
