import { Schema } from 'effect';

import { applicationResponseTypeCodeSchema } from './values/application-response-type-codes';

/**
 * @summary Response information
 *
 * @name `cac:Response`
 *
 * @cardinality (1..1)
 *
 * @see {@link messageLevelResponseDocumentResponseSchema}
 */
export const documentResponseDocumentSchema = Schema.Struct({
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
  description: Schema.optionalKey(Schema.String),
});

export type PeppolMessageLevelResponseDocumentResponseDocument = typeof documentResponseDocumentSchema.Type;
