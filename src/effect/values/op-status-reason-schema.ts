import { Schema } from 'effect';

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
 * @returns An Effect schema that accepts only valid operation status reason codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/OPStatusReason/
 */
export const opStatusReasonSchema = Schema.Literals(opStatusReasonKeys);
