import * as z from 'zod/mini';

import type { IcdCodesKeys } from '#/values/icd-codes.generated';

import { icdCodesKeys } from '#/values/icd-codes.generated';

export type PeppolIcdCode = IcdCodesKeys;

export function icdCodesSchema(error = 'Invalid ICD code provided') {
  return z.string(error).check(z.refine(val => icdCodesKeys.includes(val as never), error));
}
