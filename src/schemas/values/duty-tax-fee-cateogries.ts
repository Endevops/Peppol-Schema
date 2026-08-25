import type { Branded } from 'effect/Brand';

import * as z from 'zod/mini';

import { dutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';

export type DutyTaxFeeCategory = Branded<string, 'DutyTaxFeeCategory'>;

export function dutyTaxFeeCategorySchema(error?: string) {
  return z.string().check(z.refine(val => dutyTaxFeeCategoriesKeys.includes(val as (typeof dutyTaxFeeCategoriesKeys)[number]), error));
}
