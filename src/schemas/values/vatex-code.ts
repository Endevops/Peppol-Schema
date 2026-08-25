import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { vatexCodesKeys } from '#/values/vatex-codes.generated';

export type PeppolVatexCode = Brand.Branded<string, 'PeppolVatexCode'>;

export function vatexCodeschema(error?: string) {
  return z.string(error).check(z.refine(val => vatexCodesKeys.includes(val as (typeof vatexCodesKeys)[number]), error));
}
