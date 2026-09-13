import { Schema } from 'effect';

import { PeppolInvoiceResponseDocumentActualResponseStatus } from '#/effect/peppol-invoice-response-document-actual-response-status-schema';
import { PeppolIsoDateString } from '#/effect/peppol-iso-date-string';
import { opaque } from '#/effect/utils/opaque';
import { invoiceResponseCodeNeedsSchema } from '#/invoice-response-codes/invoice-response-code-needs-schema';
import { invoiceResponseCodeNotNeedsSchema } from '#/invoice-response-codes/invoice-response-code-not-needs-schema';

export const withStatusCodes = Schema.Literals(invoiceResponseCodeNeedsSchema);
export const withoutStatusCodes = Schema.Literals(invoiceResponseCodeNotNeedsSchema);

export class PeppolInvoiceResponseDocumentActualResponseWithoutStatus extends opaque<PeppolInvoiceResponseDocumentActualResponseWithoutStatus>()(
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
    effectiveDate: Schema.optional(PeppolIsoDateString),
    /**
     * @description Clarification is mendatory when the status is UQ-`under query`,RE-`rejected` and `CA`-Conditionally accepted. Clarification may be given as a
     * code, a description or both. If both are used, they must indicate the same clarification.
     *
     * @summary Clarification information
     *
     * @name `cac:Status`
     */
    status: Schema.optional(Schema.Array(PeppolInvoiceResponseDocumentActualResponseStatus)),
  })
) {}

export class PeppolInvoiceResponseDocumentActualResponseWithStatus extends opaque<PeppolInvoiceResponseDocumentActualResponseWithStatus>()(
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
    effectiveDate: Schema.optional(PeppolIsoDateString),
    /**
     * @description Clarification is mendatory when the status is UQ-`under query`,RE-`rejected` and `CA`-Conditionally accepted. Clarification may be given as a
     * code, a description or both. If both are used, they must indicate the same clarification.
     *
     * @summary Clarification information
     *
     * @name `cac:Status`
     */
    status: Schema.Array(PeppolInvoiceResponseDocumentActualResponseStatus).check(Schema.isMinLength(1)),
  })
) {}

export const peppolInvoiceResponseDocumentActualResponseSchema = Schema.Union([
  PeppolInvoiceResponseDocumentActualResponseWithStatus,
  PeppolInvoiceResponseDocumentActualResponseWithoutStatus,
]);

export type InvoiceResponseDocumentActualResponse = typeof peppolInvoiceResponseDocumentActualResponseSchema.Type;
