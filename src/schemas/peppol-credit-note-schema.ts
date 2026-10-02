import { Schema } from 'effect';

import { PeppolCreditNoteLine } from '#/schemas/fields/peppol-credit-note-line-schema.ts';
import { CAC_NAMESPACE, CBC_NAMESPACE, CREDIT_NOTE_NAMESPACE } from '#/schemas/namespaces.ts';
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
    creditNoteLines: Schema.Array(PeppolCreditNoteLine)
      .check(Schema.isMinLength(1))
      .pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'CreditNoteLine', description: 'CREDIT NOTE LINE.' })),
    /**
     * @description Invoice type code A code specifying the functional type of the Credit Note.
     *
     * @example
     *   381;
     *
     * @name cbc:CreditNoteTypeCode
     */
    creditNoteTypeCode: PeppolCreditNoteTypeCode.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'CreditNoteTypeCode',
        description: 'Invoice type code A code specifying the functional type of the Credit Note.',
        examples: ['381'] as unknown as ReadonlyArray<never>,
      })
    ),
  }).pipe(Schema.annotate({ xmlNamespace: CREDIT_NOTE_NAMESPACE, xmlPrefix: 'ubl', xmlName: 'CreditNote' }), Schema.toStandardSchemaV1)
) {}

/**
 * @description Type guard that returns `true` when a decoded value is a {@link PeppolCreditNote}.
 *
 * @example
 *   ```ts
 *   isPeppolCreditNote(doc); // true for a UBL CreditNote
 *   ```;
 *
 * @see {@link PeppolDocumentSchema}
 */
export const isPeppolCreditNote = Schema.is(PeppolCreditNote);
