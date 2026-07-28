import * as z from 'zod/mini';

import { MESSAGE_LEVEL_RESPONSE_PROFILE_ID } from '#/constants/message-level-response-profile-id';
import { xsdTime } from '#/schemas/utils/xsd-time';
import { messageLevelResponsePartySchema } from '#/schemas/message-level-response-party-schema';
import { messageLevelResponseDocumentResponseSchema } from '#/schemas/message-level-response-document-response-schema';

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
