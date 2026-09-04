import { Schema } from 'effect';

import { invoiceResponseCodeNeedsSchema } from '#/invoice-response-codes/invoice-response-code-needs-schema';
import { invoiceResponseCodeNotNeedsSchema } from '#/invoice-response-codes/invoice-response-code-not-needs-schema';

import { invoiceReponseDocumentActualResponseStatus } from './invoice-response-document-actual-response-status';
import { IsoDateString } from './iso-date-string';

const withStatusCodes = Schema.Literals(invoiceResponseCodeNeedsSchema);
const withoutStatusCodes = Schema.Literals(invoiceResponseCodeNotNeedsSchema);

export const invoiceResponseDocumentActualResponse = Schema.Union([
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
    effectiveDate: Schema.optionalKey(IsoDateString),
    /**
     * @description Clarification is mendatory when the status is UQ-`under query`,RE-`rejected` and `CA`-Conditionally accepted. Clarification may be given as a
     * code, a description or both. If both are used, they must indicate the same clarification.
     *
     * @summary Clarification information
     *
     * @name `cac:Status`
     */
    status: Schema.Array(invoiceReponseDocumentActualResponseStatus).check(Schema.isMinLength(1)),
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
    effectiveDate: Schema.optionalKey(IsoDateString),
    /**
     * @description Clarification is mendatory when the status is UQ-`under query`,RE-`rejected` and `CA`-Conditionally accepted. Clarification may be given as a
     * code, a description or both. If both are used, they must indicate the same clarification.
     *
     * @summary Clarification information
     *
     * @name `cac:Status`
     */
    status: Schema.optionalKey(Schema.Array(invoiceReponseDocumentActualResponseStatus)),
  }),
]);

export type InvoiceResponseDocumentActualResponse = typeof invoiceResponseDocumentActualResponse.Type;
