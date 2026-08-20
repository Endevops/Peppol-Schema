import * as z from 'zod/mini';

import type { opStatusActionKey } from '#/values/op-status-action.generated';

import { opStatusActionKeys } from '#/values/op-status-action.generated';

export type OpStatusAction = opStatusActionKey;

export function opStatusActionSchema(error?: string) {
  return z.string().check(z.refine(val => opStatusActionKeys.includes(val as OpStatusAction), error));
}
