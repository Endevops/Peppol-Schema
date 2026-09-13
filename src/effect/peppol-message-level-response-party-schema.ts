import { Schema } from 'effect';

import { PeppolIdentifier } from '#/effect/fields/peppol-identifier-schema';

export class PeppolMessageLevelResponseParty extends Schema.Opaque<PeppolMessageLevelResponseParty>()(
  Schema.Struct({
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
    endpointId: Schema.optional(PeppolIdentifier),
  })
) {}
