import * as z from 'zod/mini';

import { billingBaseSchema } from '#/schemas/billing-base';
import { creditNoteLineSchema } from '#/schemas/fields/credit-note-line-schema';
import { creditNoteTypeCodeSchema } from '#/schemas/values/credit-note-type-code-schema';

/**
 * @description Main UBL Credit Note schema (camelCase properties)
 */
export const creditNoteSchema = z.extend(billingBaseSchema, {
  /**
   * @description CREDIT NOTE LINE.
   *
   * @name cac:CreditNoteLine (1..n)
   */
  creditNoteLines: z.array(creditNoteLineSchema).check(z.minLength(1)),
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

export type PeppolCreditNote = z.infer<typeof creditNoteSchema>;
