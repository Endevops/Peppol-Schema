import { Schema } from 'effect';

import { peppolIsoDateStringSchema } from '#/effect/peppol-iso-date-string-schema';
import { icdCodesSchema } from '#/effect/values/icd-codes-schema';

import { peppolAddressSchema } from './peppol-address-schema';
import { peppolIdentifierSchema } from './peppol-identifier-schema';

export const peppolDeliverySchema = Schema.Struct({
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
  deliveryLocation: Schema.optional(
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
        peppolIdentifierSchema.pipe(
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
      address: Schema.optional(peppolAddressSchema),
    })
  ),

  /**
   * @summary Delivery party
   *
   * @name `cac:DeliveryParty`
   */
  deliveryParty: Schema.optional(
    Schema.Struct({
      /**
       * @summary PARTY NAME
       *
       * @name `cac:PartyName`
       */
      partyName: Schema.Struct({
        /**
         * @description The name of the party to which the goods and services are delivered.
         *
         * @summary Deliver to party name
         *
         * @name `cbc:Name`
         */
        name: Schema.String,
      }),
    })
  ),
});

export type PeppolDelivery = typeof peppolDeliverySchema.Type;
