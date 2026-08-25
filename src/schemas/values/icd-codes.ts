import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { icdCodesKeys } from '#/values/icd-codes.generated';

export type IcdCode = Brand.Branded<string, 'IcdCode'>;

export function icdCodesSchema(error = 'Invalid ICD code provided') {
  return z.string(error).check(z.refine(val => icdCodesKeys.includes(val as (typeof icdCodesKeys)[number]), error));
}
