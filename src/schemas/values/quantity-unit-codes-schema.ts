import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { quantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated';

export type PeppolQuantityUnitCode = Brand.Branded<string, 'PeppolQuantityUnitCode'>;

export function quantityUnitCodesSchema(error?: string) {
  return z.string(error).check(z.refine(val => quantityUnitCodesKeys.includes(val as (typeof quantityUnitCodesKeys)[number])));
}
