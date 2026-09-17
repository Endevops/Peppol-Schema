import { Schema } from 'effect';

import { invoiceResponseCodeNeedsSchema } from '#/invoice-response-codes/invoice-response-code-needs-schema.ts';
import { invoiceResponseCodeNotNeedsSchema } from '#/invoice-response-codes/invoice-response-code-not-needs-schema.ts';
import { PeppolInvoiceResponseDocumentActualResponseStatus } from '#/schemas/peppol-invoice-response-document-actual-response-status-schema.ts';
import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description Response codes that require a clarification in `cac:Status`: `UQ`, `RE` and `CA`.
 *
 * @example
 *   ```ts
 *   withStatusCodes; // Schema.Literals(['UQ', 'RE', 'CA'])
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseDocumentActualResponseWithStatus}
 */
export const withStatusCodes = Schema.Literals(invoiceResponseCodeNeedsSchema);

/**
 * @description Response codes that do not require a clarification in `cac:Status`: `AB`, `AP`, `IP` and `PD`.
 *
 * @example
 *   ```ts
 *   withoutStatusCodes; // Schema.Literals(['AB', 'AP', 'IP', 'PD'])
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseDocumentActualResponseWithoutStatus}
 */
export const withoutStatusCodes = Schema.Literals(invoiceResponseCodeNotNeedsSchema);

/**
 * @description Invoice response for statuses that do not require a clarification; the `cac:Status` group is optional.
 *
 * @example
 *   ```ts
 *   { responseCode: 'AP', effectiveDate: '2018-08-02' }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseDocumentActualResponse}
 */
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

/**
 * @description Invoice response for statuses that require a clarification; at least one `cac:Status` group is mandatory.
 *
 * @example
 *   ```ts
 *   { responseCode: 'RE', status: [{ statusReason: 'TAX reference not found' }] }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseDocumentActualResponse}
 */
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

/**
 * @description Union of the invoice response variants selected by `cbc:ResponseCode`: one that requires a clarification and one that does not.
 *
 * @example
 *   ```ts
 *   { responseCode: 'AP', effectiveDate: '2018-08-02' }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseDocumentResponse}
 */
export class PeppolInvoiceResponseDocumentActualResponse extends opaque<PeppolInvoiceResponseDocumentActualResponse>()(
  Schema.Union([PeppolInvoiceResponseDocumentActualResponseWithStatus, PeppolInvoiceResponseDocumentActualResponseWithoutStatus])
) {}

/**
 * @description Alias of {@link PeppolInvoiceResponseDocumentActualResponse}.
 */
export type InvoiceResponseDocumentActualResponse = PeppolInvoiceResponseDocumentActualResponse;
