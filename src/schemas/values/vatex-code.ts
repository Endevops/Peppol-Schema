import * as z from 'zod/mini';

import type { vatexCodesKey } from '#/values/vatex-codes.generated';

import { vatexCodesKeys } from '#/values/vatex-codes.generated';

export type PeppolVatexCode = vatexCodesKey;

export function vatexCodeschema(error?: string) {
  return z.string(error).check(z.refine(val => vatexCodesKeys.includes(val as PeppolVatexCode), error));
}
