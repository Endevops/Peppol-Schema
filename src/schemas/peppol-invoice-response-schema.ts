import { Schema, Struct } from 'effect';

import { INVOICE_RESPONSE_PROFILE_ID } from '#/constants/invoice-response-profile-id.ts';
import { PeppolContact } from '#/schemas/fields/peppol-contact-schema.ts';
import { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema.ts';
import { PeppolPartyLegalEntity } from '#/schemas/fields/peppol-party-legal-entity-schema.ts';
import { CAC_NAMESPACE, CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { PeppolInvoiceResponseDocumentActualResponse } from '#/schemas/peppol-invoice-response-document-actual-response-schema.ts';
import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string.ts';
import { PeppolMessageLevelResponseParty } from '#/schemas/peppol-message-level-response-party-schema.ts';
import { PeppolMessageLevelResponse } from '#/schemas/peppol-message-level-response-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { StringIdentifierSchema } from '#/schemas/utils/string-identifier-schema.ts';
import { PeppolDocumentTypeCode } from '#/schemas/values/peppol-document-type-code-schema.ts';

/**
 * @description Wraps `cac:PartyName` for the seller or buyer on an invoice response: the party's legal or trading name.
 *
 * @example
 *   ```ts
 *   { name: 'Seller Business Name AS' }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseDocumentResponseParty}
 */
export class PeppolInvoiceResponseDocumentResponsePartyName extends opaque<PeppolInvoiceResponseDocumentResponsePartyName>()(
  Schema.Struct({
    /**
     * @description - The party that issued the reference invoice
     * - The party who the referenced invoice is issued.
     *
     * @summary Seller/Buyer party name
     *
     * @name `cbc:Name`
     */
    name: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'Name' })),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description Party used for the sender and receiver of an invoice response. Extends {@link PeppolMessageLevelResponseParty}.
 *
 * @example
 *   ```ts
 *   { partyLegalEntity: { registrationName: 'Seller Business Name AS' } }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponse}
 */
export class PeppolInvoiceResponseParty extends opaque<PeppolInvoiceResponseParty>()(
  PeppolMessageLevelResponseParty.pipe(
    Schema.fieldsAssign({
      /**
       * @summary Party partyIdentification
       */
      partyIdentification: Schema.Struct({
        id: StringIdentifierSchema(PeppolIdentifier).pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })),
      }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'PartyIdentification' }), Schema.optional),
      partyLegalEntity: PeppolPartyLegalEntity.mapFields(Struct.pick(['registrationName'])).pipe(
        Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'PartyLegalEntity' })
      ),
    }),
    Schema.toStandardSchemaV1
  )
) {}

/**
 * @description Sender party of an invoice response. Extends {@link PeppolInvoiceResponseParty} with optional `cac:Contact` details.
 *
 * @example
 *   ```ts
 *   { partyLegalEntity: { registrationName: 'Seller Business Name AS' } }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponse}
 */
export class PeppolInvoiceResponseSenderParty extends opaque<PeppolInvoiceResponseSenderParty>()(
  PeppolInvoiceResponseParty.pipe(
    Schema.fieldsAssign({
      /**
       * @summary Contact information
       *
       * @name `cac:Contact`
       */
      contact: PeppolContact.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'Contact' }), Schema.optional),
    }),
    Schema.toStandardSchemaV1
  )
) {}

/**
 * @description Party schema used under `cac:DocumentReference/(cac:IssuerParty|cac:RecipientParty)`
 */
export class PeppolInvoiceResponseDocumentResponseParty extends opaque<PeppolInvoiceResponseDocumentResponseParty>()(
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
    partyName: PeppolInvoiceResponseDocumentResponsePartyName.pipe(
      Schema.annotate({
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'PartyName',
        examples: ['Seller Business Name AS'] as unknown as ReadonlyArray<never>,
      })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description Wraps `cac:DocumentReference` inside an invoice response: identifies the invoice the status applies to.
 *
 * @example
 *   ```ts
 *   { id: 'inv-99876', issueDate: '2018-08-01', documentTypeCode: '380' }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseDocumentResponse}
 */
export class PeppolInvoiceResponseDocumentReference extends opaque<PeppolInvoiceResponseDocumentReference>()(
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
    id: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })),
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
    issueDate: PeppolIsoDateString.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'IssueDate' }), Schema.optional),
    /**
     * @example
     *   `380`;
     *
     * @summary Identifier type code
     */
    documentTypeCode: PeppolDocumentTypeCode.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'DocumentTypeCode' })),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description Wraps `cac:DocumentResponse` inside an invoice response: the response, the referenced invoice and optional parties.
 *
 * @example
 *   ```ts
 *   { response: { responseCode: 'AP', effectiveDate: '2018-08-02' }, documentReference: { id: 'inv-99876', documentTypeCode: '380' } }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponse}
 */
export class PeppolInvoiceResponseDocumentResponse extends opaque<PeppolInvoiceResponseDocumentResponse>()(
  Schema.Struct({
    /**
     * @summary Response information
     *
     * @name `cac:Response`
     *
     * @cardinality (1..1)
     */
    response: PeppolInvoiceResponseDocumentActualResponse.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'Response' })
    ),
    /**
     * @summary Document reference
     *
     * @name `cac:DocumentReference`
     */
    documentReference: PeppolInvoiceResponseDocumentReference.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'DocumentReference' })
    ),
    /**
     * @summary Seller party information
     *
     * @name `cac:IssuerParty`
     */
    issuerParty: Schema.optional(PeppolInvoiceResponseDocumentResponseParty).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'IssuerParty' })
    ),
    /**
     * @summary Buyer party information
     *
     * @name `cac:RecipientParty`
     */
    recipientParty: Schema.optional(PeppolInvoiceResponseDocumentResponseParty).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'RecipientParty' })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description The invoice response is a descendant of the message level response with more fields. Effect port of `invoiceResponseSchema`
 * (`z.extend(messageLevelResponse, ...)` → `messageLevelResponse.pipe(Schema.fieldsAssign(...))`), overriding `profileId` with
 * `Schema.Literal(INVOICE_RESPONSE_PROFILE_ID)` plus sender/receiver/documentResponse.
 */
export class PeppolInvoiceResponse extends opaque<PeppolInvoiceResponse>()(
  Schema.Struct({
    ...PeppolMessageLevelResponse.fields,
    profileId: Schema.Literal(INVOICE_RESPONSE_PROFILE_ID).pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ProfileID' })
    ),
    /**
     * @description The party sending an electronic message level response message back to the sending party of the business document.
     *
     * @summary Sender information
     */
    senderParty: PeppolInvoiceResponseSenderParty.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'SenderParty' })),
    /**
     * @description The party, an electronic message level response was addressed to, and who is supposed to process the message level response. This is the same
     * party as the sender of the business document.
     *
     * @summary Receiver information
     */
    receiverParty: PeppolInvoiceResponseParty.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'ReceiverParty' })),
    /**
     * @description General comments or instructions that are revelant to the response as a whole.
     *
     * @example
     *   `Please refere to previous email exchange regarding this invoice.`;
     *
     * @summary Invoice response note
     */
    note: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'Note' }), Schema.optional),
    /**
     * @summary Document response
     */
    documentResponse: PeppolInvoiceResponseDocumentResponse.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'DocumentResponse' })
    ),
  }).pipe(
    Schema.annotate({
      xmlNamespace: 'urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2',
      xmlPrefix: 'ubl',
      xmlName: 'ApplicationResponse',
      description:
        'The invoice response is a descendant of the message level response with more fields. Effect port of `invoiceResponseSchema` (`z.extend(messageLevelResponse, ...)` → `messageLevelResponse.pipe(Schema.fieldsAssign(...))`), overriding `profileId` with `Schema.Literal(INVOICE_RESPONSE_PROFILE_ID)` plus sender/receiver/documentResponse.',
      title: 'PEPPOL Invoice Response',
      examples: [
        {
          profileId: INVOICE_RESPONSE_PROFILE_ID,
          senderParty: { partyLegalEntity: { registrationName: 'Seller Business Name AS' } },
          receiverParty: { partyLegalEntity: { registrationName: 'Buyer Business Name AS' } },
          documentResponse: {
            response: { responseCode: 'AP', effectiveDate: '2018-08-02' },
            documentReference: { id: 'inv-99876', documentTypeCode: '380' },
            issuerParty: { partyLegalEntity: { registrationName: 'Seller Business Name AS' } },
            recipientParty: { partyLegalEntity: { registrationName: 'Buyer Business Name AS' } },
          },
        },
      ] as unknown as ReadonlyArray<never>,
    }),
    Schema.toStandardSchemaV1
  )
) {}

/**
 * @description Type guard that returns `true` when a decoded value is a {@link PeppolInvoiceResponse}.
 *
 * @example
 *   ```ts
 *   isPeppolInvoiceResponse(doc); // true for an invoice response ApplicationResponse
 *   ```;
 *
 * @see {@link PeppolDocumentSchema}
 */
export const isPeppolInvoiceResponse = Schema.is(PeppolInvoiceResponse);
