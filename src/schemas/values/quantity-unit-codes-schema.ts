import * as z from 'zod/mini';

import type { quantityUnitCodesKey } from '#/values/quantity-unit-codes.generated';

import { quantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated';

export type QuantityUnitCode = quantityUnitCodesKey;
export type PeppolQuantityUnitCodes = quantityUnitCodesKey;

export function quantityUnitCodesSchema(error?: string) {
  return z.string(error).check(z.refine(val => quantityUnitCodesKeys.includes(val as QuantityUnitCode)));
}
