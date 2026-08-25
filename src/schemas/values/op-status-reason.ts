import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { opStatusReasonKeys } from '#/values/op-status-reason.generated';

export type OpStatusReason = Brand.Branded<string, 'OpStatusReason'>;

export function opStatusReasonSchema(error?: string) {
  return z.string().check(z.refine(val => opStatusReasonKeys.includes(val as (typeof opStatusReasonKeys)[number]), error));
}
