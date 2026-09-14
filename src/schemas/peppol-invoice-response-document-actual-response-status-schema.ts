import { Schema } from 'effect';

import { peppolInvoiceResponseStatusReasonCodeSchema } from '#/schemas/peppol-invoice-response-status-reason-code-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

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
  })
) {}

export class PeppolInvoiceResponseDocumentActualResponseStatus extends opaque<PeppolInvoiceResponseDocumentActualResponseStatus>()(
  Schema.Struct({
    /**
     * @description A code defining a clarification given for the invoice status.
     *
     * @summary Clarification code
     *
     * @name `cbc:StatusReasonCode`
     */
    statusReasonCode: Schema.optional(peppolInvoiceResponseStatusReasonCodeSchema),
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
  })
) {}

export type InvoiceResponseDocumentActualResponseStatus = PeppolInvoiceResponseDocumentActualResponseStatus;
