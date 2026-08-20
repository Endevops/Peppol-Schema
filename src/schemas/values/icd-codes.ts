import * as z from 'zod/mini';

import type { icdCodesKey } from '#/values/icd-codes.generated';

import { icdCodesKeys } from '#/values/icd-codes.generated';

export type IcdCode = icdCodesKey;

export function icdCodesSchema(error = 'Invalid ICD code provided') {
  return z.string(error).check(z.refine(val => icdCodesKeys.includes(val as IcdCode), error));
}
