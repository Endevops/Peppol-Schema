import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { opStatusReasonKeys } from '#/values/op-status-reason.generated';

/**
 * @description Validates an OpenPeppol operation status reason code against the OPStatusReason codelist.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid operation status reason codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/OPStatusReason/
 */
export class PeppolOpStatusReason extends opaque<PeppolOpStatusReason>()(
  Schema.Literals(opStatusReasonKeys).pipe(Schema.brand('PeppolOpStatusReason'))
) {}
