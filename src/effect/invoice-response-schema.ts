import { Schema, Struct } from 'effect';

import { INVOICE_RESPONSE_PROFILE_ID } from '#/constants/invoice-response-profile-id';

import { contactSchema } from './fields/contact-schema';
import { identifierSchema } from './fields/identifier-schema';
import { partyLegalEntitySchema } from './fields/party-legal-entity-schema';
import { invoiceResponseDocumentActualResponse } from './invoice-response-document-actual-response';
import { IsoDateString } from './iso-date-string';
import { messageLevelResponsePartySchema } from './message-level-response-party-schema';
import { messageLevelResponse } from './message-level-response-schema';
import { documentTypeCodeSchema } from './values/document-type-codes';

const invoiceResponsePartySchema = messageLevelResponsePartySchema.pipe(
  Schema.fieldsAssign({
    /**
     * @summary Party partyIdentification
     */
    partyIdentification: Schema.optional(identifierSchema()),
    partyLegalEntity: partyLegalEntitySchema.mapFields(Struct.pick(['registrationName'])),
  })
);

const invoiceResponseSenderPartySchema = invoiceResponsePartySchema.pipe(
  Schema.fieldsAssign({
    /**
     * @summary Contact information
     *
     * @name `cac:Contact`
     */
    contact: Schema.optional(contactSchema),
  })
);

export type InvoiceResponseParty = typeof invoiceResponsePartySchema.Type | typeof invoiceResponseSenderPartySchema.Type;

/**
 * @description Party schema used under `cac:DocumentReference/(cac:IssuerParty|cac:RecipientParty)`
 */
const invoiceResponseDocumentResponseParty = Schema.Struct({
  /**
   * @summary Party partyIdentification
   */
  partyIdentification: Schema.optional(identifierSchema()),
  /**
   * @example
   *   Seller Business Name AS
   *
   * @name cac:PartyName
   */
  partyName: Schema.Struct({
    /**
     * @description - The party that issued the reference invoice
     * - The party who the referenced invoice is issued.
     *
     * @summary Seller/Buyer party name
     *
     * @name `cbc:Name`
     */
    name: Schema.String,
  }),
});

export type InvoiceDocumentResponseParty = typeof invoiceResponseDocumentResponseParty.Type;

const invoiceResponseDocumentReferenceSchema = Schema.Struct({
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
  id: Schema.String,
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
  issueDate: Schema.optional(IsoDateString),
  /**
   * @example
   *   `380`;
   *
   * @summary Identifier type code
   */
  documentTypeCode: documentTypeCodeSchema(),
});

export type InvoiceResponseDocumentReference = typeof invoiceResponseDocumentReferenceSchema.Type;

const invoiceResponseDocumentResponseSchema = Schema.Struct({
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
  issuerParty: Schema.optional(invoiceResponseDocumentResponseParty),
  /**
   * @summary Buyer party information
   *
   * @name `cac:RecipientParty`
   */
  recipientParty: Schema.optional(invoiceResponseDocumentResponseParty),
});

export type InvoiceResponseDocumentResponse = typeof invoiceResponseDocumentResponseSchema.Type;

// Export nested party/reference/response schemas for reuse and barrel parity with zod module.
export {
  invoiceResponseDocumentReferenceSchema,
  invoiceResponseDocumentResponseParty,
  invoiceResponseDocumentResponseSchema,
  invoiceResponsePartySchema,
  invoiceResponseSenderPartySchema,
};

/**
 * @description The invoice response is a descendant of the message level response with more fields. Effect port of `invoiceResponseSchema`
 * (`z.extend(messageLevelResponse, ...)` → `messageLevelResponse.pipe(Schema.fieldsAssign(...))`), overriding `profileId` with
 * `Schema.Literal(INVOICE_RESPONSE_PROFILE_ID)` plus sender/receiver/documentResponse.
 */
export const invoiceResponseSchema = messageLevelResponse.pipe(
  Schema.fieldsAssign({
    profileId: Schema.Literal(INVOICE_RESPONSE_PROFILE_ID),
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
    note: Schema.optional(Schema.String),
    /**
     * @summary Document response
     */
    documentResponse: invoiceResponseDocumentResponseSchema,
  })
);

export type PeppolInvoiceResponse = typeof invoiceResponseSchema.Type;
