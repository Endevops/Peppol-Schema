import * as z from 'zod/mini';

import { identifierSchema } from '#/schemas/fields/identifier-schema';

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
