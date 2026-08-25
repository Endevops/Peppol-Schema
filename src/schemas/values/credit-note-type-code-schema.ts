import * as z from 'zod/mini';

import type { CreditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

import { creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

/**
 * @description A credit note type code as defined by the PEPPOL subset of UNCL 1001 (credit note).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-cn/
 */
export type CreditNoteType = CreditNoteTypeCodesKeys;

/**
 * @description Validates a credit note type code against the PEPPOL subset of UNCL 1001 (credit note).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid credit note type codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-cn/
 */
export function creditNoteTypeCodeSchema(error?: string) {
  return z.string().check(z.refine(val => creditNoteTypeCodesKeys.includes(val as never), error));
}
