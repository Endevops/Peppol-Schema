import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolApplicationResponseTypeCode } from '#/schemas/values/application-response-type-code-schema.ts';

/**
 * @description Wraps `cac:Response` inside a message level response: the overall response code and an optional textual note.
 *
 * @summary Response information
 *
 * @name `cac:Response`
 *
 * @cardinality (1..1)
 *
 * @see {@link PeppolMessageLevelResponseDocumentResponse}
 */
export class PeppolDocumentResponseDocument extends opaque<PeppolDocumentResponseDocument>()(
  Schema.Struct({
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
    responseCode: PeppolApplicationResponseTypeCode,
    /**
     * @description Used to meake any comments or instructions relevant to the response. The use of this element requires manual assessment by the receiver.
     *
     * @summary Response textual notes
     */
    description: Schema.optional(Schema.String),
  }).pipe(Schema.toStandardSchemaV1)
) {}
