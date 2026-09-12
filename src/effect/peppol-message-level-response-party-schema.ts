import { Schema } from 'effect';

import { peppolIdentifierSchema } from '#/effect/fields/peppol-identifier-schema';

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
  endpointId: Schema.optional(peppolIdentifierSchema),
});

export type PeppolMessageLevelResponseParty = typeof peppolMessageLevelResponsePartySchema.Type;
