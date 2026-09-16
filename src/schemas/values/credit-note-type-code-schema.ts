import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

/**
 * @description Validates a credit note type code against the PEPPOL subset of UNCL 1001 (credit note).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid credit note type codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-cn/
 */
export class PeppolCreditNoteTypeCode extends opaque<PeppolCreditNoteTypeCode>()(Schema.Literals(creditNoteTypeCodesKeys)) {}
