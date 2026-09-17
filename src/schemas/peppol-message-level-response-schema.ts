import { Schema } from 'effect';

import { MESSAGE_LEVEL_RESPONSE_PROFILE_ID } from '#/constants/message-level-response-profile-id.ts';
import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string.ts';
import { PeppolMessageLevelResponseDocumentResponse } from '#/schemas/peppol-message-level-response-document-response-schema.ts';
import { PeppolMessageLevelResponseParty } from '#/schemas/peppol-message-level-response-party-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolXsdTime } from '#/schemas/utils/peppol-xsd-time-schema.ts';

/**
 * @description UBL `ApplicationResponse` message level response for PEPPOL BIS Billing 3.0 (profile `urn:fdc:peppol.eu:poacc:bis:mlr:3`).
 *
 * @example
 *   ```ts
 *   {
 *     customizationId: 'urn:fdc:peppol.eu:poacc:trns:mlr:3',
 *     profileId: 'urn:fdc:peppol.eu:poacc:bis:mlr:3',
 *     id: '23',
 *     issueDate: '2017-11-01',
 *     senderParty: {},
 *     receiverParty: {},
 *     documentResponse: { response: { responseCode: 'RE' }, documentReference: { id: 'EnvelopeID-12345' }, lineResponse: [] }
 *   }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponse}
 */
export class PeppolMessageLevelResponse extends opaque<PeppolMessageLevelResponse>()(
  Schema.Struct({
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
    customizationId: Schema.String,
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
    profileId: Schema.Literal(MESSAGE_LEVEL_RESPONSE_PROFILE_ID),
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
    id: Schema.String,
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
    issueDate: PeppolIsoDateString,
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
    issueTime: Schema.optional(PeppolXsdTime),
    /**
     * @description The party sending an electronic message level response message back to the sending party of the business document.
     *
     * @summary Sender information
     */
    senderParty: PeppolMessageLevelResponseParty,
    /**
     * @description The party, an electronic message level response was addressed to, and who is supposed to process the message level response. This is the same
     * party as the sender of the business document.
     *
     * @summary Receiver information
     */
    receiverParty: PeppolMessageLevelResponseParty,
    /**
     * @description The document response is used to indicate the result of business document validation. The element
     * `cac:DocumentResponse/cac:Response/cbc:ResponseCode` MUST contain the overall result code.
     *
     * @summary Document response
     *
     * @name `cac:DocumentResponse`
     */
    documentResponse: PeppolMessageLevelResponseDocumentResponse,
  })
) {}
