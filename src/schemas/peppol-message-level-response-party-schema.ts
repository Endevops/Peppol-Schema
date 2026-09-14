import { Schema } from 'effect';

import { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

export class PeppolMessageLevelResponseParty extends opaque<PeppolMessageLevelResponseParty>()(
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
