import * as z from 'zod/mini';
import { MESSAGE_LEVEL_RESPONSE_PROFILE_ID } from '#/constants';
import { identifierSchema } from '#/schemas/fields/identifier-schema';
import { xsdTime } from '#/schemas/utils/xsd-time';
import { applicationResponseTypeCodeSchema } from '#/schemas/values/application-response-type-codes';
import { documentTypeCodeSchema } from '#/schemas/values/document-type-codes';

export const messageLevelResponsePartySchema = z.object({
  /**
   * @description Identifies the sender party's electronic address.
   *
   * @example
   *   7300010000001;
   *
   * @summary Sender/Receiver party's electronic address
   *
   * @name `cbc:EndpointID (+ @schemeID)`
   */
  endpointId: z.optional(identifierSchema()),
});
export type PeppolMessageLevelResponseParty = z.infer<typeof messageLevelResponsePartySchema>;

/**
 * @summary Response information
 *
 * @name `cac:Response`
 *
 * @cardinality (1..1)
 *
 * @see {@link messageLevelResponseDocumentResponseSchema}
 */
export const documentResponseDocumentSchema = z.object({
  /**
   * @description An indicator stating whether the referenced message was cleared through validation and advanced to the next step in the process. A negative
   * response states that the document was not processed because of identified issues.
   *
   * @example
   *   `RE`;
   *
   * @summary Message response code
   *
   * @name `cbc:ResponseCode`
   */
  responseCode: applicationResponseTypeCodeSchema(),
  /**
   * @description Used to meake any comments or instructions relevant to the response. The use of this element requires manual assessment by the receiver.
   *
   * @summary Response textual notes
   */
  description: z.optional(z.string()),
});
export type PeppolMessageLevelResponseDocumentResponseDocument = z.infer<typeof documentResponseDocumentSchema>;

export const documentResponseDocumentReferenceSchema = z.object({
  /**
   * @description Identifies the document on which the message level response is based.
   *
   * @example
   *   `EnvelopeID-12345`;
   *
   * @summary Document identifier
   *
   * @name `cbc:ID`
   */
  id: z.string(),
  /**
   * @description The type of the document being referred to, expressed as a code.
   *
   * @summary Document type code
   *
   * @name `cbc:DocumentTypeCode`
   */
  documentTypeCode: z.optional(documentTypeCodeSchema()),
  /**
   * @description The version of the document that has been identifier with the document identifier.
   *
   * @example
   *   `2`;
   *
   * @summary Document version identifier
   *
   * @name `cbc:VersionID`
   */
  versionId: z.optional(z.string()),
});
export type PeppolMessageLevelDocumentResponseDocumentReference = z.infer<typeof documentResponseDocumentReferenceSchema>;

export const documentResponseLineResponseContent = z.object({
  /**
   * @description An indicator stating whether the referenced message was cleared through validation and advanced to the next step in the process. A negative
   * response states that the document was not processed because of identified issues.
   *
   * @example
   *   `RE`;
   *
   * @summary Line response code
   *
   * @name `cbc:ResponseCode`
   */
  responseCode: applicationResponseTypeCodeSchema(),
  /**
   * @description The description of the issued identifier in the transaction document.
   *
   * @example
   *   `Validation gives error [CL-T77-R0002]- Tax categories MUST be coded using UN/ECE 5305 code list`;
   *
   * @summary Issue description
   *
   * @name `cbc:Description`
   */
  description: z.string(),
  /**
   * @name `cac:Status`
   */
  status: z.object({
    /**
     * @description A codified version of the issue description that describes the nature of the issue. e.g. Syntax violation, business rule violation, ...
     *
     * @summary Issue type coded
     *
     * @name `cbc:StatusReasonCode`
     */
    statusReasonCode: z.enum(['BV', 'BW', 'SV']),
  }),
});
export type DocumentResponseLineResponseContent = z.infer<typeof documentResponseLineResponseContent>;

export const documentResponseLineResponseSchema = z.object({
  /**
   * @description Identifies the line in the business document to which the reported issue applies.
   *
   * @summary Line reference
   *
   * @name `cac:LineReference`
   */
  lineReference: z.object({
    /**
     * @description Identifies the section of the document to which the reported issue applied. The LineID element mustbe used to indicate where in the business
     * document the error occurred by using XPath to reference the element causing the error. To cater for scenarios where it is not possible to
     * provide XPath, a dummy value must be applied. The dummay value must consist of the characters NA. This is due to that the LineID element is
     * mendatory in the ApplicationResponse message in UBL 2.1 on which the MLR message is based.
     *
     * @example
     *   `/Catalogue/cac:CatalogueLine[3]/cac:Item[1]/cac:ClassifiedTaxCategory[1]/cbc:ID[1]`;
     *
     * @summary Section identifier
     */
    lineId: z.string(),
  }),
  /**
   * @summary Line response information
   */
  response: documentResponseLineResponseContent,
});

export type PeppolMessageLevelDocumentResponseLineResponse = z.infer<typeof documentResponseLineResponseSchema>;

export const messageLevelResponseDocumentResponseSchema = z.object({
  /**
   * @summary Response information
   *
   * @name `cac:Response`
   *
   * @cardinality (1..1)
   */
  response: documentResponseDocumentSchema,
  /**
   * @description The document reference is used to provide a reference to the envelope of the business document on which the message level response is based. The
   * message level response message may only cover exactly one business document. The element `cac:DocumentResponse/cac:DocumentReference/cbc:ID`
   * **MUST** contain the instance identifier of the envelope of the original business document.
   *
   * @summary Document reference
   */
  documentReference: documentResponseDocumentReferenceSchema,
  /**
   * @description A response to a particular line in the document. If the document response is negative (code='RE'), the line response element is used to specify
   * the errors in the business document.
   *
   * @summary Line response information
   */
  lineResponse: z.array(documentResponseLineResponseSchema),
});

export type PeppolMessageLevelMessageLevelResponseDocumentResponse = z.infer<typeof messageLevelResponseDocumentResponseSchema>;

export const messageLevelResponse = z.object({
  /**
   * @description Identifies the specification of content and rules that apply to the transaction.
   *
   * @default `urn:fdc:peppol.eu:poacc:trns:mlr:3`
   *
   * @summary Specification identification
   *
   * @name `cbc:CustomizationID`
   *
   * @cardinality 1..1
   */
  customizationId: z.string(),
  /**
   * @description Identifies the BII profile or business process context in which the transaction appears.
   *
   * @remarks
   *   Fixed value to `urn:fdc:peppol.eu:poacc:bis:mlr:3`
   *
   * @default `urn:fdc:peppol.eu:poacc:bis:mlr:3`
   *
   * @summary Business process type identifier
   *
   * @name `cbc:ProfileID`
   */
  profileId: z.literal(MESSAGE_LEVEL_RESPONSE_PROFILE_ID),
  /**
   * @description A transaction instance must contain an identifier. The identifier enables positive referencing the transaction instance for various puropses
   * including referencing between transactions that are part of the same process.
   *
   * @example
   *   23;
   *
   * @summary Response identifier
   *
   * @name cbc:ID
   */
  id: z.string(),
  /**
   * @description The date on which the transaction instance was issued.
   *
   * @example
   *   2017 - 11 - 01;
   *
   * @summary Response issue date
   *
   * @format `YYYY-MM-DD`
   *
   * @name cbc:IssueDate
   */
  issueDate: z.iso.date(),
  /**
   * @description The time at which the transaction instance was issued.
   *
   * @example
   *   12:01:34
   *
   * @summary Response issue time
   *
   * @format `hh:mm:ss`
   *
   * @name cbc:IssueDate
   */
  issueTime: z.optional(xsdTime),
  /**
   * @description The party sending an electronic message level response message back to the sending party of the business document.
   *
   * @summary Sender information
   */
  senderParty: messageLevelResponsePartySchema,
  /**
   * @description The party, an electronic message level response was addressed to, and who is supposed to process the message level response. This is the same
   * party as the sender of the business document.
   *
   * @summary Receiver information
   */
  receiverParty: messageLevelResponsePartySchema,
  /**
   * @description The document response is used to indicate the result of business document validation. The element
   * `cac:DocumentResponse/cac:Response/cbc:ResponseCode` MUST contain the overall result code.
   *
   * @summary Document response
   *
   * @name `cac:DocumentResponse`
   */
  documentResponse: messageLevelResponseDocumentResponseSchema,
});

export type PeppolMessageLevelResponse = z.infer<typeof messageLevelResponse>;
