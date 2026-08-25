import * as z from 'zod/mini';

import type { ItemClassificationCodesKeys } from '#/values/item-classification-code.generated';

import { itemClassificationCodesKeys } from '#/values/item-classification-code.generated';

export type PeppolItemClassificationCodes = ItemClassificationCodesKeys;

export function itemClassificationCodesSchema(error?: string) {
  return z.string().check(z.refine(val => itemClassificationCodesKeys.includes(val as never), error));
}
