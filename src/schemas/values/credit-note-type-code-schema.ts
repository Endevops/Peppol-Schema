import * as z from 'zod/mini';

import type { CreditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

import { creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

export type CreditNoteType = CreditNoteTypeCodesKeys;

export function creditNoteTypeCodeSchema(error?: string) {
  return z.string().check(z.refine(val => creditNoteTypeCodesKeys.includes(val as never), error));
}
