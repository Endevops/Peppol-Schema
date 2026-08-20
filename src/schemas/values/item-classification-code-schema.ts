import * as z from 'zod/mini';

import type { itemClassificationCodesKey } from '#/values/item-classification-code.generated';

import { itemClassificationCodesKeys } from '#/values/item-classification-code.generated';

export type ItemClassificationCodes = itemClassificationCodesKey;

export function itemClassificationCodesSchema(error?: string) {
  return z.string().check(z.refine(val => itemClassificationCodesKeys.includes(val as ItemClassificationCodes), error));
}
