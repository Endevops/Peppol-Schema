import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { opStatusActionKeys } from '#/values/op-status-action.generated';

/**
 * @description Validates an OpenPeppol operation status action code against the OPStatusAction codelist.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid operation status action codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/OPStatusAction/
 */
export class PeppolOpStatusAction extends opaque<PeppolOpStatusAction>()(
  Schema.Literals(opStatusActionKeys).pipe(Schema.brand('PeppolOpStatusAction'))
) {}
