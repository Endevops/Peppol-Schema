import * as z from 'zod/mini';

import type { creditNoteTypeCodesKey } from '#/values/credit-notes-type-codes.generated';

import { creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

export type CreditNoteTypeCodes = creditNoteTypeCodesKey;

export function creditNoteTypeCodeSchema(error?: string) {
  return z.string().check(z.refine(val => creditNoteTypeCodesKeys.includes(val as CreditNoteTypeCodes), error));
}
