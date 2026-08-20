import * as z from 'zod/mini';

import type { opStatusReasonKey } from '#/values/op-status-reason.generated';

import { opStatusReasonKeys } from '#/values/op-status-reason.generated';

export type OpStatusReason = opStatusReasonKey;

export function opStatusReasonSchema(error?: string) {
  return z.string().check(z.refine(val => opStatusReasonKeys.includes(val as OpStatusReason), error));
}
