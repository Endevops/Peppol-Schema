import { Schema } from 'effect';

import { peppolCreditNoteLineSchema } from '#/effect/fields/peppol-credit-note-line-schema';
import { peppolBillingBaseSchema } from '#/effect/peppol-billing-base-schema';
import { creditNoteTypeCodeSchema } from '#/effect/values/credit-note-type-code-schema';

/**
 * @description Main UBL Credit Note schema (camelCase properties) Effect port of `creditNoteSchema` (`z.extend(billingBaseSchema, ...)` →
 * `peppolBillingBaseSchema.pipe(Schema.fieldsAssign(...))`).
 */
export const peppolCreditNoteSchema = Schema.Struct({
  ...peppolBillingBaseSchema.fields,
  /**
   * @description CREDIT NOTE LINE.
   *
   * @name cac:CreditNoteLine (1..n)
   */
  creditNoteLines: Schema.Array(peppolCreditNoteLineSchema).check(Schema.isMinLength(1)),
  /**
   * @description Invoice type code A code specifying the functional type of the Credit Note.
   *
   * @example
   *   381;
   *
   * @name cbc:CreditNoteTypeCode
   */
  creditNoteTypeCode: creditNoteTypeCodeSchema(),
});

export type PeppolCreditNote = typeof peppolCreditNoteSchema.Type;
