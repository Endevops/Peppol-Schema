import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { itemClassificationCodesKeys } from '#/values/item-classification-code.generated';

export type ItemClassificationCodes = Brand.Branded<string, 'ItemClassificationCodes'>;

export function itemClassificationCodesSchema(error?: string) {
  return z.string().check(z.refine(val => itemClassificationCodesKeys.includes(val as (typeof itemClassificationCodesKeys)[number]), error));
}
