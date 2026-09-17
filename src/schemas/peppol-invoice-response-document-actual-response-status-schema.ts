import { Schema } from 'effect';

import { PeppolInvoiceResponseStatusReasonCode } from '#/schemas/peppol-invoice-response-status-reason-code-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description Wraps `cac:Condition` inside a status: a detail code and its optional value that further explains the clarification.
 *
 * @example
 *   ```ts
 *   { attributeId: 'BT-75', description: 'EU123456789' }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseDocumentActualResponseStatus}
 */
export class PeppolInvoiceResponseCondition extends opaque<PeppolInvoiceResponseCondition>()(
  Schema.Struct({
    /**
     * @description A code defining the type of the detail.
     *
     * @example
     *   `BT-75`;
     *
     * @summary Detail type code
     *
     * @name `cbc:AttributeId`
     */
    attributeId: Schema.String,
    /**
     * @description The value of the detail.
     *
     * @example
     *   `EU123456789`;
     *
     * @summary Detail value
     *
     * @name `cbc:Description`
     */
    description: Schema.optional(Schema.String),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description Wraps `cac:Status` inside an invoice response: an optional clarification code and description plus any condition details.
 *
 * @example
 *   ```ts
 *   { statusReasonCode: { value: 'REF', listId: 'OPStatusReason' }, statusReason: 'TAX reference not found' }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseDocumentActualResponse}
 */
export class PeppolInvoiceResponseDocumentActualResponseStatus extends opaque<PeppolInvoiceResponseDocumentActualResponseStatus>()(
  Schema.Struct({
    /**
     * @description A code defining a clarification given for the invoice status.
     *
     * @summary Clarification code
     *
     * @name `cbc:StatusReasonCode`
     */
    statusReasonCode: Schema.optional(PeppolInvoiceResponseStatusReasonCode),
    /**
     * @description The description of the clarification given for the invoice status.
     *
     * @example
     *   `TAX reference not found`;
     *
     * @summary Clarification description
     *
     * @name `cbc:StatusReason
     */
    statusReason: Schema.optional(Schema.String),
    /**
     * @summary Condition
     *
     * @name `cac:Condition`
     */
    condition: Schema.optional(Schema.Array(PeppolInvoiceResponseCondition)),
  }).pipe(Schema.toStandardSchemaV1)
) {}
