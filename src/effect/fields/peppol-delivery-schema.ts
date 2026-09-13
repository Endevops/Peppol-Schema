import { Schema } from 'effect';

import { peppolIsoDateStringSchema } from '#/effect/peppol-iso-date-string-schema';
import { opaque } from '#/effect/utils/opaque';
import { icdCodesSchema } from '#/effect/values/icd-codes-schema';

import { PeppolAddress } from './peppol-address-schema';
import { PeppolIdentifier } from './peppol-identifier-schema';

class PeppolDeliveryPartyPartyName extends opaque<PeppolDeliveryPartyPartyName>()(
  Schema.Struct({
    /**
     * @description The name of the party to which the goods and services are delivered.
     *
     * @summary Deliver to party name
     *
     * @name `cbc:Name`
     */
    name: Schema.String,
  })
) {}

class PeppolDeliveryParty extends opaque<PeppolDeliveryParty>()(
  Schema.Struct({
    /**
     * @summary PARTY NAME
     *
     * @name `cac:PartyName`
     */
    partyName: PeppolDeliveryPartyPartyName,
  })
) {}

class PeppolDeliveryLocation extends opaque<PeppolDeliveryLocation>()(
  Schema.Struct({
    /**
     * @description An identifier for the location at which the goods and services are delivered.
     *
     * @example
     *   `83745498753497`;
     *
     * @summary Deliver to location identifier
     *
     * @name `cbc:ID`
     */
    id: Schema.optional(
      PeppolIdentifier.pipe(
        Schema.fieldsAssign({
          /**
           * @description An identifier for the location at which the goods and services are delivered.
           *
           * @example
           *   `83745498753497`;
           *
           * @summary Deliver to location identifier
           *
           * @name `#text`
           */
          id: Schema.String,
          /**
           * @description The identification scheme identifier of the Deliver to location identifier.
           *
           * @summary Deliver to location identifier identification scheme identifier
           *
           * @name `@schemeID`
           */
          schemeId: Schema.optional(icdCodesSchema),
        })
      )
    ),
    /**
     * @description A groupd of business terms providing infomation about the address to which goods and services invoiced were or are delivered.
     *
     * @summary Deliver to address
     *
     * @name `cac:Address`
     */
    address: Schema.optional(PeppolAddress),
  })
) {}

export class PeppolDelivery extends opaque<PeppolDelivery>()(
  Schema.Struct({
    /**
     * @description Th edate on which the supply of goods or services was made or completed.
     *
     * @example
     *   2017 - 12 - 01;
     *
     * @summary Actual delivery date
     *
     * @format `YYYY-MM-DD`
     *
     * @name cbc:ActualDeliveryDate
     */
    actualDeliveryDate: Schema.optional(peppolIsoDateStringSchema),
    /**
     * @name `cac:DeliveryLocation`
     */
    deliveryLocation: Schema.optional(PeppolDeliveryLocation),

    /**
     * @summary Delivery party
     *
     * @name `cac:DeliveryParty`
     */
    deliveryParty: Schema.optional(PeppolDeliveryParty),
  })
) {}
