import * as z from 'zod/mini';

import type { VatexCodesKeys } from '#/values/vatex-codes.generated';

import { vatexCodesKeys } from '#/values/vatex-codes.generated';

export type PeppolVatexCode = VatexCodesKeys;

export function vatexCodeschema(error?: string) {
  return z.string(error).check(z.refine(val => vatexCodesKeys.includes(val as never), error));
}
