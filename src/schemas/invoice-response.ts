import * as z from 'zod/mini';

import { INVOICE_RESPONSE_PROFILE_ID } from '#/constants';
import { invoiceResponseCodeNeedsSchema } from '#/index';
import { invoiceResponseCodeNotNeedsSchema } from '#/invoice-response-codes';
import { contactSchema } from '#/schemas/fields/contact-schema';
import { dateOnlyParser } from '#/schemas/fields/date-only';
import { identifierSchema } from '#/schemas/fields/identifier-schema';
import { partyLegalEntitySchema } from '#/schemas/fields/party-legal-entity-schema';
import { messageLevelResponse, messageLevelResponsePartySchema } from '#/schemas/message-level-response';
import { documentTypeCodeSchema } from '#/schemas/values/document-type-codes';
import { opStatusActionSchema } from '#/schemas/values/op-status-action';
import { opStatusReasonSchema } from '#/schemas/values/op-status-reason';

const invoiceResponsePartySchema = z.extend(messageLevelResponsePartySchema, {
  /**
   * @summary Party partyIdentification
   */
  partyIdentification: z.optional(identifierSchema()),
  partyLegalEntity: z.pick(partyLegalEntitySchema, { registrationName: true }),
});
const invoiceResponseSenderPartySchema = z.extend(invoiceResponsePartySchema, {
  /**
   * @summary Contact information
   *
   * @name `cac:Contact`
   */
  contact: z.optional(contactSchema),
});

export type InvoiceResponseParty = z.infer<typeof invoiceResponsePartySchema> | z.infer<typeof invoiceResponseSenderPartySchema>;

/**
 * @description Party schema used under `cac:DocumentReference/(cac:IssuerParty|cac:RecipientParty)`
 */
const invoiceResponseDocumentResponseParty = z.object({
  /**
   * @summary Party partyIdentification
   */
  partyIdentification: z.optional(identifierSchema()),
  /**
   * @example
   *   Seller Business Name AS
   *
   * @name cac:PartyName
   */
  partyName: z.object({
    /**
     * @description - The party that issued the reference invoice
     * - The party who the referenced invoice is issued.
     *
     * @summary Seller/Buyer party name
     *
     * @name `cbc:Name`
     */
    name: z.string(),
  }),
});
export type InvoiceDocumentResponseParty = z.infer<typeof invoiceResponseDocumentResponseParty>;

const invoiceResponseDocumentReferenceSchema = z.object({
  /**
   * @description An identifier for the invoice that the status applies to. The invoice identifier must be of the main invoice number that appears in the invoice
   * itself.
   *
   * @example
   *   `inv-99876`;
   *
   * @summary Invoice identifier
   *
   * @name `cbc:ID`
   */
  id: z.string(),
  /**
   * @description The date on which the referenced invoice was issued.
   *
   * @example
   *   `2018-08-01`;
   *
   * @summary Invoice issue date
   *
   * @name `cbc:IssueDate`
   */
  issueDate: z.optional(z.iso.date()),
  /**
   * @example
   *   `380`;
   *
   * @summary Identifier type code
   */
  documentTypeCode: documentTypeCodeSchema(),
});
export type InvoiceResponseDocumentReference = z.infer<typeof invoiceResponseDocumentReferenceSchema>;

export const invoiceResponseStatusReasonCode = z.discriminatedUnion('listId', [
  z.object({
    value: opStatusActionSchema(),
    /**
     * @description List identifier for clarification.
     *
     * @summary List identifier
     *
     * @name `@listId`
     */
    listId: z.literal('OPStatusAction'),
  }),
  z.object({
    value: opStatusReasonSchema(),
    /**
     * @description List identifier for clarification.
     *
     * @summary List identifier
     *
     * @name `@listId`
     */
    listId: z.literal('OPStatusReason'),
  }),
]);
export type InvoiceResponseStatusReasonCode = z.infer<typeof invoiceResponseStatusReasonCode>;

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

const withStatusCodes = z.enum(invoiceResponseCodeNeedsSchema);
const withoutStatusCodes = z.enum(invoiceResponseCodeNotNeedsSchema);

export const invoiceResponseDocumentActualResponse = z.discriminatedUnion('responseCode', [
  z.object({
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
    effectiveDate: z.optional(z.union([z.iso.date(), dateOnlyParser()], 'invalid effective date')),
    /**
     * @description Clarification is mendatory when the status is UQ-`under query`,RE-`rejected` and `CA`-Conditionally accepted. Clarification may be given as a
     * code, a description or both. If both are used, they must indicate the same clarification.
     *
     * @summary Clarification information
     *
     * @name `cac:Status`
     */
    status: z.array(invoiceReponseDocumentActualResponseStatus).check(z.minLength(1)),
  }),
  z.object({
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
    effectiveDate: z.optional(z.union([z.iso.date(), dateOnlyParser()], 'invalid effective date')),
    /**
     * @description Clarification is mendatory when the status is UQ-`under query`,RE-`rejected` and `CA`-Conditionally accepted. Clarification may be given as a
     * code, a description or both. If both are used, they must indicate the same clarification.
     *
     * @summary Clarification information
     *
     * @name `cac:Status`
     */
    status: z.optional(z.array(invoiceReponseDocumentActualResponseStatus)),
  }),
]);

export type InvoiceResponseDocumentActualResponse = z.infer<typeof invoiceResponseDocumentActualResponse>;

const invoiceResponseDocumentResponseSchema = z.object({
  /**
   * @summary Response information
   *
   * @name `cac:Response`
   *
   * @cardinality (1..1)
   */
  response: invoiceResponseDocumentActualResponse,
  /**
   * @summary Document reference
   *
   * @name `cac:DocumentReference`
   */
  documentReference: invoiceResponseDocumentReferenceSchema,
  /**
   * @summary Seller party information
   *
   * @name `cac:IssuerParty`
   */
  issuerParty: z.optional(invoiceResponseDocumentResponseParty),
  /**
   * @summary Buyer party information
   *
   * @name `cac:RecipientParty`
   */
  recipientParty: z.optional(invoiceResponseDocumentResponseParty),
});
export type InvoiceResponseDocumentResponse = z.infer<typeof invoiceResponseDocumentResponseSchema>;

/**
 * @description The invoice response is a descendant of the message level response with more fields.
 */
export const invoiceResponseSchema = z.extend(messageLevelResponse, {
  profileId: z.literal(INVOICE_RESPONSE_PROFILE_ID),
  /**
   * @description The party sending an electronic message level response message back to the sending party of the business document.
   *
   * @summary Sender information
   */
  senderParty: invoiceResponseSenderPartySchema,
  /**
   * @description The party, an electronic message level response was addressed to, and who is supposed to process the message level response. This is the same
   * party as the sender of the business document.
   *
   * @summary Receiver information
   */
  receiverParty: invoiceResponsePartySchema,
  /**
   * @description General comments or instructions that are revelant to the response as a whole.
   *
   * @example
   *   `Please refere to previous email exchange regarding this invoice.`;
   *
   * @summary Invoice response note
   */
  note: z.optional(z.string()),
  /**
   * @summary Document response
   */
  documentResponse: invoiceResponseDocumentResponseSchema,
});

export type PeppolInvoiceResponse = z.infer<typeof invoiceResponseSchema>;
