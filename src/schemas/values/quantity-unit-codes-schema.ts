import * as z from 'zod/mini';

import type { QuantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated';

import { quantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated';

export type PeppolQuantityUnitCode = QuantityUnitCodesKeys;

export function quantityUnitCodesSchema(error?: string) {
  return z.string(error).check(z.refine(val => quantityUnitCodesKeys.includes(val as never)));
}
