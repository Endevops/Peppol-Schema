import * as z from 'zod/mini';

import { applicationResponseTypeCodeSchema } from '#/schemas/values/application-response-type-codes';

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
