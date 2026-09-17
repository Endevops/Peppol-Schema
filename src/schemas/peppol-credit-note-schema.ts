import { Schema } from 'effect';

import { PeppolCreditNoteLine } from '#/schemas/fields/peppol-credit-note-line-schema.ts';
import { PeppolBillingBase } from '#/schemas/peppol-billing-base-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolCreditNoteTypeCode } from '#/schemas/values/credit-note-type-code-schema.ts';

/**
 * @description Main UBL Credit Note schema (camelCase properties) Effect port of `creditNoteSchema` (`z.extend(billingBaseSchema, ...)` →
 * `PeppolBillingBase.pipe(Schema.fieldsAssign(...))`).
 */
export class PeppolCreditNote extends opaque<PeppolCreditNote>()(
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
    creditNoteTypeCode: PeppolCreditNoteTypeCode,
  }).pipe(Schema.toStandardSchemaV1)
) {}
