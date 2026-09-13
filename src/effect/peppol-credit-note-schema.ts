import { Schema } from 'effect';

import { PeppolCreditNoteLine } from '#/effect/fields/peppol-credit-note-line-schema';
import { PeppolBillingBase } from '#/effect/peppol-billing-base-schema';
import { creditNoteTypeCodeSchema } from '#/effect/values/credit-note-type-code-schema';

/**
 * @description Main UBL Credit Note schema (camelCase properties) Effect port of `creditNoteSchema` (`z.extend(billingBaseSchema, ...)` →
 * `PeppolBillingBase.pipe(Schema.fieldsAssign(...))`).
 */
export class PeppolCreditNote extends Schema.Opaque<PeppolCreditNote>()(
  Schema.Struct({
    ...PeppolBillingBase.fields,
    /**
     * @description CREDIT NOTE LINE.
     *
     * @name cac:CreditNoteLine (1..n)
     */
    creditNoteLines: Schema.Array(PeppolCreditNoteLine).check(Schema.isMinLength(1)),
    /**
     * @description Invoice type code A code specifying the functional type of the Credit Note.
     *
     * @example
     *   381;
     *
     * @name cbc:CreditNoteTypeCode
     */
    creditNoteTypeCode: creditNoteTypeCodeSchema,
  })
) {}
