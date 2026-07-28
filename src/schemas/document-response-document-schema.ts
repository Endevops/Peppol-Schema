import * as z from 'zod/mini';

import { applicationResponseTypeCodeSchema } from '#/schemas/values/application-response-type-codes';

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
