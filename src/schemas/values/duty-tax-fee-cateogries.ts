import * as z from 'zod/mini';

import type { dutyTaxFeeCategoriesKey } from '#/values/duty-tax-fee-categories.generated';

import { dutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';

export type DutyTaxFeeCategoryCode = dutyTaxFeeCategoriesKey;

export function dutyTaxFeeCategorySchema(error?: string) {
  return z.string().check(z.refine(val => dutyTaxFeeCategoriesKeys.includes(val as DutyTaxFeeCategoryCode), error));
}
