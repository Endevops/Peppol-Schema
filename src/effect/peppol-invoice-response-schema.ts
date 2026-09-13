import { Schema, Struct } from 'effect';

import { INVOICE_RESPONSE_PROFILE_ID } from '#/constants/invoice-response-profile-id';
import { PeppolContact } from '#/effect/fields/peppol-contact-schema';
import { PeppolIdentifier } from '#/effect/fields/peppol-identifier-schema';
import { PeppolPartyLegalEntity } from '#/effect/fields/peppol-party-legal-entity-schema';
import { peppolInvoiceResponseDocumentActualResponseSchema } from '#/effect/peppol-invoice-response-document-actual-response-schema';
import { peppolIsoDateStringSchema } from '#/effect/peppol-iso-date-string-schema';
import { PeppolMessageLevelResponseParty } from '#/effect/peppol-message-level-response-party-schema';
import { PeppolMessageLevelResponse } from '#/effect/peppol-message-level-response-schema';
import { peppolDocumentTypeCodeSchema } from '#/effect/values/peppol-document-type-code-schema';

class PeppolPartyName extends Schema.Opaque<PeppolPartyName>()(
  Schema.Struct({
    /**
     * @description - The party that issued the reference invoice
     * - The party who the referenced invoice is issued.
     *
     * @summary Seller/Buyer party name
     *
     * @name `cbc:Name`
     */
    name: Schema.String,
  })
) {}

export class PeppolInvoiceResponseParty extends Schema.Opaque<PeppolInvoiceResponseParty>()(
  PeppolMessageLevelResponseParty.pipe(
    Schema.fieldsAssign({
      /**
       * @summary Party partyIdentification
       */
      partyIdentification: Schema.optional(PeppolIdentifier),
      partyLegalEntity: PeppolPartyLegalEntity.mapFields(Struct.pick(['registrationName'])),
    })
  )
) {}

export class PeppolInvoiceResponseSenderParty extends Schema.Opaque<PeppolInvoiceResponseSenderParty>()(
  PeppolInvoiceResponseParty.pipe(
    Schema.fieldsAssign({
      /**
       * @summary Contact information
       *
       * @name `cac:Contact`
       */
      contact: Schema.optional(PeppolContact),
    })
  )
) {}

/**
 * @description Party schema used under `cac:DocumentReference/(cac:IssuerParty|cac:RecipientParty)`
 */
export class PeppolInvoiceResponseDocumentResponseParty extends Schema.Opaque<PeppolInvoiceResponseDocumentResponseParty>()(
  Schema.Struct({
    /**
     * @summary Party partyIdentification
     */
    partyIdentification: Schema.optional(PeppolIdentifier),
    /**
     * @example
     *   Seller Business Name AS
     *
     * @name cac:PartyName
     */
    partyName: PeppolPartyName,
  })
) {}

export type PeppolInvoiceDocumentResponseParty = PeppolInvoiceResponseDocumentResponseParty;

export class PeppolInvoiceResponseDocumentReference extends Schema.Opaque<PeppolInvoiceResponseDocumentReference>()(
  Schema.Struct({
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
    documentTypeCode: peppolDocumentTypeCodeSchema,
  })
) {}

export class PeppolInvoiceResponseDocumentResponse extends Schema.Opaque<PeppolInvoiceResponseDocumentResponse>()(
  Schema.Struct({
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
    documentReference: PeppolInvoiceResponseDocumentReference,
    /**
     * @summary Seller party information
     *
     * @name `cac:IssuerParty`
     */
    issuerParty: Schema.optional(PeppolInvoiceResponseDocumentResponseParty),
    /**
     * @summary Buyer party information
     *
     * @name `cac:RecipientParty`
     */
    recipientParty: Schema.optional(PeppolInvoiceResponseDocumentResponseParty),
  })
) {}

/**
 * @description The invoice response is a descendant of the message level response with more fields. Effect port of `invoiceResponseSchema`
 * (`z.extend(messageLevelResponse, ...)` → `messageLevelResponse.pipe(Schema.fieldsAssign(...))`), overriding `profileId` with
 * `Schema.Literal(INVOICE_RESPONSE_PROFILE_ID)` plus sender/receiver/documentResponse.
 */
export class PeppolInvoiceResponse extends Schema.Opaque<PeppolInvoiceResponse>()(
  PeppolMessageLevelResponse.pipe(
    Schema.fieldsAssign({
      profileId: Schema.Literal(INVOICE_RESPONSE_PROFILE_ID),
      /**
       * @description The party sending an electronic message level response message back to the sending party of the business document.
       *
       * @summary Sender information
       */
      senderParty: PeppolInvoiceResponseSenderParty,
      /**
       * @description The party, an electronic message level response was addressed to, and who is supposed to process the message level response. This is the same
       * party as the sender of the business document.
       *
       * @summary Receiver information
       */
      receiverParty: PeppolInvoiceResponseParty,
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
      documentResponse: PeppolInvoiceResponseDocumentResponse,
    })
  )
) {}
