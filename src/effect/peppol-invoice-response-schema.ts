import { Schema, Struct } from 'effect';

import { INVOICE_RESPONSE_PROFILE_ID } from '#/constants/invoice-response-profile-id';

import { identifierSchema } from './fields/identifier-schema';
import { peppolContactSchema } from './fields/peppol-contact-schema';
import { peppolPartyLegalEntitySchema } from './fields/peppol-party-legal-entity-schema';
import { peppolInvoiceResponseDocumentActualResponseSchema } from './peppol-invoice-response-document-actual-response-schema';
import { peppolIsoDateStringSchema } from './peppol-iso-date-string-schema';
import { peppolMessageLevelResponsePartySchema } from './peppol-message-level-response-party-schema';
import { peppolMessageLevelResponseSchema } from './peppol-message-level-response-schema';
import { peppolDocumentTypeCodeSchema } from './values/peppol-document-type-code-schema';

export const peppolInvoiceResponsePartySchema = peppolMessageLevelResponsePartySchema.pipe(
  Schema.fieldsAssign({
    /**
     * @summary Party partyIdentification
     */
    partyIdentification: Schema.optional(identifierSchema()),
    partyLegalEntity: peppolPartyLegalEntitySchema.mapFields(Struct.pick(['registrationName'])),
  })
);

export const peppolInvoiceResponseSenderPartySchema = peppolInvoiceResponsePartySchema.pipe(
  Schema.fieldsAssign({
    /**
     * @summary Contact information
     *
     * @name `cac:Contact`
     */
    contact: Schema.optional(peppolContactSchema),
  })
);

export type PeppolInvoiceResponseParty = typeof peppolInvoiceResponsePartySchema.Type | typeof peppolInvoiceResponseSenderPartySchema.Type;

/**
 * @description Party schema used under `cac:DocumentReference/(cac:IssuerParty|cac:RecipientParty)`
 */
export const peppolInvoiceResponseDocumentResponsePartySchema = Schema.Struct({
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

export type PeppolInvoiceDocumentResponseParty = typeof peppolInvoiceResponseDocumentResponsePartySchema.Type;

export const peppolInvoiceResponseDocumentReferenceSchema = Schema.Struct({
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
  issueDate: Schema.optional(peppolIsoDateStringSchema),
  /**
   * @example
   *   `380`;
   *
   * @summary Identifier type code
   */
  documentTypeCode: peppolDocumentTypeCodeSchema(),
});

export type PeppolInvoiceResponseDocumentReference = typeof peppolInvoiceResponseDocumentReferenceSchema.Type;

export const peppolInvoiceResponseDocumentResponseSchema = Schema.Struct({
  /**
   * @summary Response information
   *
   * @name `cac:Response`
   *
   * @cardinality (1..1)
   */
  response: peppolInvoiceResponseDocumentActualResponseSchema,
  /**
   * @summary Document reference
   *
   * @name `cac:DocumentReference`
   */
  documentReference: peppolInvoiceResponseDocumentReferenceSchema,
  /**
   * @summary Seller party information
   *
   * @name `cac:IssuerParty`
   */
  issuerParty: Schema.optional(peppolInvoiceResponseDocumentResponsePartySchema),
  /**
   * @summary Buyer party information
   *
   * @name `cac:RecipientParty`
   */
  recipientParty: Schema.optional(peppolInvoiceResponseDocumentResponsePartySchema),
});

export type PeppolInvoiceResponseDocumentResponse = typeof peppolInvoiceResponseDocumentResponseSchema.Type;

/**
 * @description The invoice response is a descendant of the message level response with more fields. Effect port of `invoiceResponseSchema`
 * (`z.extend(messageLevelResponse, ...)` → `messageLevelResponse.pipe(Schema.fieldsAssign(...))`), overriding `profileId` with
 * `Schema.Literal(INVOICE_RESPONSE_PROFILE_ID)` plus sender/receiver/documentResponse.
 */
export const peppolInvoiceResponseSchema = peppolMessageLevelResponseSchema.pipe(
  Schema.fieldsAssign({
    profileId: Schema.Literal(INVOICE_RESPONSE_PROFILE_ID),
    /**
     * @description The party sending an electronic message level response message back to the sending party of the business document.
     *
     * @summary Sender information
     */
    senderParty: peppolInvoiceResponseSenderPartySchema,
    /**
     * @description The party, an electronic message level response was addressed to, and who is supposed to process the message level response. This is the same
     * party as the sender of the business document.
     *
     * @summary Receiver information
     */
    receiverParty: peppolInvoiceResponsePartySchema,
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
    documentResponse: peppolInvoiceResponseDocumentResponseSchema,
  })
);

export type PeppolInvoiceResponse = typeof peppolInvoiceResponseSchema.Type;
