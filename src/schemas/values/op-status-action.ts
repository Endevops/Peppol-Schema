import * as z from 'zod/mini';

import type { OpStatusActionKeys } from '#/values/op-status-action.generated';

import { opStatusActionKeys } from '#/values/op-status-action.generated';

/**
 * @description An OpenPeppol operation status action code (e.g. the outcome of a message response).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/OPStatusAction/
 */
export type PeppolOpStatusAction = OpStatusActionKeys;

/**
 * @description Validates an OpenPeppol operation status action code against the OPStatusAction codelist.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid operation status action codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/OPStatusAction/
 */
export function opStatusActionSchema(error?: string) {
  return z.string().check(z.refine(val => opStatusActionKeys.includes(val as (typeof opStatusActionKeys)[number]), error));
}
