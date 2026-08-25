import * as z from 'zod/mini';

import { invoiceResponseStatusReasonCode } from '#/schemas/invoice-response-status-reason-code';

const invoiceResponseCondition = z.object({
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
  attributeId: z.string(),
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
  description: z.optional(z.string()),
});
export type InvoiceResponseCondition = z.infer<typeof invoiceResponseCondition>;

export const invoiceReponseDocumentActualResponseStatus = z.object({
  /**
   * @description A code defining a clarification given for the invoice status.
   *
   * @summary Clarification code
   *
   * @name `cbc:StatusReasonCode`
   */
  statusReasonCode: z.optional(invoiceResponseStatusReasonCode),
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
  statusReason: z.optional(z.string()),
  /**
   * @summary Condition
   *
   * @name `cac:Condition`
   */
  condition: z.optional(z.array(invoiceResponseCondition)),
});
export type InvoiceReponseDocumentActualResponseStatus = z.infer<typeof invoiceReponseDocumentActualResponseStatus>;
