import * as z from 'zod/mini';

import type { OpStatusActionKeys } from '#/values/op-status-action.generated';

import { opStatusActionKeys } from '#/values/op-status-action.generated';

export type PeppolOpStatusAction = OpStatusActionKeys;

export function opStatusActionSchema(error?: string) {
  return z.string().check(z.refine(val => opStatusActionKeys.includes(val as (typeof opStatusActionKeys)[number]), error));
}
