import { Schema } from 'effect';

import { identifierSchema } from './fields/identifier-schema';

export const peppolMessageLevelResponsePartySchema = Schema.Struct({
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
  endpointId: Schema.optional(identifierSchema()),
});

export type PeppolMessageLevelResponseParty = typeof peppolMessageLevelResponsePartySchema.Type;
