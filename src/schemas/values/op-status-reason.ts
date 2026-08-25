import * as z from 'zod/mini';

import type { OpStatusReasonKeys } from '#/values/op-status-reason.generated';

import { opStatusReasonKeys } from '#/values/op-status-reason.generated';

/**
 * @description An OpenPeppol operation status reason code (e.g. the reason for a message response outcome).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/OPStatusReason/
 */
export type PeppolOpStatusReason = OpStatusReasonKeys;

/**
 * @description Validates an OpenPeppol operation status reason code against the OPStatusReason codelist.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid operation status reason codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/OPStatusReason/
 */
export function opStatusReasonSchema(error?: string) {
  return z.string().check(z.refine(val => opStatusReasonKeys.includes(val as (typeof opStatusReasonKeys)[number]), error));
}
