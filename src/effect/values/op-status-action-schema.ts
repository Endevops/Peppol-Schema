import { Schema } from 'effect';

import { opStatusActionKeys } from '#/values/op-status-action.generated';

/**
 * @description An OpenPeppol operation status action code (e.g. the outcome of a message response).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/OPStatusAction/
 */
export type PeppolOpStatusAction = typeof opStatusActionSchema.Type;

/**
 * @description Validates an OpenPeppol operation status action code against the OPStatusAction codelist.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid operation status action codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/OPStatusAction/
 */
export const opStatusActionSchema = Schema.Literals(opStatusActionKeys).pipe(Schema.brand('PeppolOpStatusAction'));
