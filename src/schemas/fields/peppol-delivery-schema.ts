import { Schema } from 'effect';

import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolIcdCode } from '#/schemas/values/icd-codes-schema.ts';

import { PeppolAddress } from './peppol-address-schema.ts';
import { PeppolIdentifier } from './peppol-identifier-schema.ts';

/**
 * @description The name of the party to which the goods and services are delivered. Wraps the `cac:PartyName` element of the delivery party.
 *
 * @example
 *   ```ts
 *   { name: 'Delivery party Name' }
 *   ```;
 *
 * @see {@link PeppolDeliveryParty}
 */
export class PeppolDeliveryPartyPartyName extends opaque<PeppolDeliveryPartyPartyName>()(
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

/**
 * @description The party to which the goods and services are delivered, when it differs from the Buyer. Wraps the `cac:DeliveryParty` element.
 *
 * @example
 *   ```ts
 *   { partyName: { name: 'Delivery party Name' } }
 *   ```;
 *
 * @see {@link PeppolDelivery}
 */
export class PeppolDeliveryParty extends opaque<PeppolDeliveryParty>()(
  Schema.Struct({
    /**
     * @summary PARTY NAME
     *
     * @name `cac:PartyName`
     */
    partyName: PeppolDeliveryPartyPartyName,
  })
) {}

/**
 * @description The location at which the goods and services are delivered, identified by an identifier and an optional address. Wraps the `cac:DeliveryLocation`
 * element.
 *
 * @example
 *   ```ts
 *   { id: { id: '9483759475923478', schemeId: '0088' }, address: { cityName: 'Stockholm', countryCode: { identificationCode: 'SE' } } }
 *   ```;
 *
 * @see {@link PeppolDelivery}
 */
export class PeppolDeliveryLocation extends opaque<PeppolDeliveryLocation>()(
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
          schemeId: Schema.optional(PeppolIcdCode),
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

/**
 * @description Information about the delivery of the goods and services, such as the actual delivery date, the delivery location and the delivery party. Wraps the
 * `cac:Delivery` element.
 *
 * @example
 *   ```ts
 *   { actualDeliveryDate: '2017-11-01', deliveryLocation: { id: { id: '9483759475923478' } } }
 *   ```;
 *
 * @see {@link PeppolDeliveryLocation}
 */
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
    actualDeliveryDate: Schema.optional(PeppolIsoDateString),
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
