import * as z from 'zod/mini';

import { INVOICE_RESPONSE_PROFILE_ID } from '#/constants/invoice-response-profile-id';
import { contactSchema } from '#/schemas/fields/contact-schema';
import { identifierSchema } from '#/schemas/fields/identifier-schema';
import { partyLegalEntitySchema } from '#/schemas/fields/party-legal-entity-schema';
import { invoiceResponseDocumentActualResponse } from '#/schemas/invoice-response-document-actual-response';
import { messageLevelResponse } from '#/schemas/message-level-response-schema';
import { messageLevelResponsePartySchema } from '#/schemas/message-level-response-party-schema';
import { documentTypeCodeSchema } from '#/schemas/values/document-type-codes';

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
