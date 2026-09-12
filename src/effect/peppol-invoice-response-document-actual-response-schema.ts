import { Schema } from 'effect';

import { peppolInvoiceResponseDocumentActualResponseStatusSchema } from '#/effect/peppol-invoice-response-document-actual-response-status-schema';
import { peppolIsoDateStringSchema } from '#/effect/peppol-iso-date-string-schema';
import { invoiceResponseCodeNeedsSchema } from '#/invoice-response-codes/invoice-response-code-needs-schema';
import { invoiceResponseCodeNotNeedsSchema } from '#/invoice-response-codes/invoice-response-code-not-needs-schema';

const withStatusCodes = Schema.Literals(invoiceResponseCodeNeedsSchema);
const withoutStatusCodes = Schema.Literals(invoiceResponseCodeNotNeedsSchema);

export const peppolInvoiceResponseDocumentActualResponseSchema = Schema.Union([
  Schema.Struct({
    /**
     * @remarks
     *   This is a rejection code that needs clarification in {@link status}
     *
     * @summary A code stating the status of the invoice in the process.
     *
     * @name `cbc:ResponseCode`
     */
    responseCode: withStatusCodes,
    /**
     * @description The date when the status became effective.
     *
     * @example
     *   `2018-08-02`;
     *
     * @summary Status date
     *
     * @name `cbc:EffectiveDate`
     */
    effectiveDate: Schema.optional(peppolIsoDateStringSchema),
    /**
     * @description Clarification is mendatory when the status is UQ-`under query`,RE-`rejected` and `CA`-Conditionally accepted. Clarification may be given as a
     * code, a description or both. If both are used, they must indicate the same clarification.
     *
     * @summary Clarification information
     *
     * @name `cac:Status`
     */
    status: Schema.Array(peppolInvoiceResponseDocumentActualResponseStatusSchema).check(Schema.isMinLength(1)),
  }),
  Schema.Struct({
    /**
     * @summary A code stating the status of the invoice in the process.
     *
     * @name `cbc:ResponseCode`
     */
    responseCode: withoutStatusCodes,
    /**
     * @description The date when the status became effective.
     *
     * @example
     *   `2018-08-02`;
     *
     * @summary Status date
     *
     * @name `cbc:EffectiveDate`
     */
    effectiveDate: Schema.optional(peppolIsoDateStringSchema),
    /**
     * @description Clarification is mendatory when the status is UQ-`under query`,RE-`rejected` and `CA`-Conditionally accepted. Clarification may be given as a
     * code, a description or both. If both are used, they must indicate the same clarification.
     *
     * @summary Clarification information
     *
     * @name `cac:Status`
     */
    status: Schema.optional(Schema.Array(peppolInvoiceResponseDocumentActualResponseStatusSchema)),
  }),
]);

export type InvoiceResponseDocumentActualResponse = typeof peppolInvoiceResponseDocumentActualResponseSchema.Type;
