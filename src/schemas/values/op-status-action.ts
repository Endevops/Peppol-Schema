import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { opStatusActionKeys } from '#/values/op-status-action.generated';

export type OpStatusAction = Brand.Branded<string, 'OpStatusAction'>;

export function opStatusActionSchema(error?: string) {
  return z.string().check(z.refine(val => opStatusActionKeys.includes(val as (typeof opStatusActionKeys)[number]), error));
}
