import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

export type CreditNoteType = Brand.Branded<string, 'CreditNoteType'>;

export function creditNoteTypeCodeSchema(error?: string) {
  return z.string().check(z.refine(val => creditNoteTypeCodesKeys.includes(val as (typeof creditNoteTypeCodesKeys)[number]), error));
}
