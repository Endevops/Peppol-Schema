import { Schema } from 'effect';

import { billingBaseSchema } from './billing-base';
import { creditNoteLineSchema } from './fields/credit-note-line-schema';
import { creditNoteTypeCodeSchema } from './values/credit-note-type-code-schema';

/**
 * @description Main UBL Credit Note schema (camelCase properties) Effect port of `creditNoteSchema` (`z.extend(billingBaseSchema, ...)` →
 * `billingBaseSchema.pipe(Schema.fieldsAssign(...))`).
 */
export const creditNoteSchema = billingBaseSchema.pipe(
  Schema.fieldsAssign({
    /**
     * @description CREDIT NOTE LINE.
     *
     * @name cac:CreditNoteLine (1..n)
     */
    creditNoteLines: Schema.Array(creditNoteLineSchema).check(Schema.isMinLength(1)),
    /**
     * @description Invoice type code A code specifying the functional type of the Credit Note.
     *
     * @example
     *   381;
     *
     * @name cbc:CreditNoteTypeCode
     */
    creditNoteTypeCode: creditNoteTypeCodeSchema(),
  })
);

export type PeppolCreditNote = typeof creditNoteSchema.Type;
