import * as z from 'zod/mini';

import type { DutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';

import { dutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';

export type PeppolDutyTaxFeeCategory = DutyTaxFeeCategoriesKeys;

export function dutyTaxFeeCategorySchema(error?: string) {
  return z.string().check(z.refine(val => dutyTaxFeeCategoriesKeys.includes(val as never), error));
}
