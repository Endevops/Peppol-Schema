import * as z from 'zod/mini';

import type { OpStatusReasonKeys } from '#/values/op-status-reason.generated';

import { opStatusReasonKeys } from '#/values/op-status-reason.generated';

export type PeppolOpStatusReason = OpStatusReasonKeys;

export function opStatusReasonSchema(error?: string) {
  return z.string().check(z.refine(val => opStatusReasonKeys.includes(val as (typeof opStatusReasonKeys)[number]), error));
}
