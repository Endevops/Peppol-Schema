import { Schema } from 'effect';

import type { CreditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

import { creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

/**
 * @description A credit note type code as defined by the PEPPOL subset of UNCL 1001 (credit note).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-cn/
 */
export type PeppolCreditNoteTypeCode = CreditNoteTypeCodesKeys;

/**
 * @description Validates a credit note type code against the PEPPOL subset of UNCL 1001 (credit note).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid credit note type codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-cn/
 */
export function creditNoteTypeCodeSchema(error?: string) {
  const schema = Schema.Literals(creditNoteTypeCodesKeys);
  return error === undefined ? schema : schema.annotate({ message: error });
}
