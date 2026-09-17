import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolApplicationResponseTypeCode } from '#/schemas/values/application-response-type-code-schema.ts';

/**
 * @description Wraps `cac:Status` inside a line response: the coded reason for an issue found in the document.
 *
 * @example
 *   ```ts
 *   { statusReasonCode: 'SV' }
 *   ```;
 *
 * @see {@link PeppolDocumentResponseLineResponseContent}
 */
export class PeppolStatus extends opaque<PeppolStatus>()(
  Schema.Struct({
    /**
     * @description A codified version of the issue description that describes the nature of the issue. e.g. Syntax violation, business rule violation, ...
     *
     * @summary Issue type coded
     *
     * @name `cbc:StatusReasonCode`
     */
    statusReasonCode: Schema.Literals(['BV', 'BW', 'SV']),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description A response to a particular line in the business document: the line response code, a description of the issue and its coded status.
 *
 * @example
 *   ```ts
 *   { responseCode: 'RE', description: 'Validation gives error [CL-T77-R0002]', status: { statusReasonCode: 'SV' } }
 *   ```;
 *
 * @see {@link PeppolDocumentResponseLineResponse}
 */
export class PeppolDocumentResponseLineResponseContent extends opaque<PeppolDocumentResponseLineResponseContent>()(
  Schema.Struct({
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
    responseCode: PeppolApplicationResponseTypeCode,
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
    description: Schema.String,
    /**
     * @name `cac:Status`
     */
    status: PeppolStatus,
  }).pipe(Schema.toStandardSchemaV1)
) {}
