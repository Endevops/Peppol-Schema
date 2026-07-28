import * as z from 'zod/mini';

import { addressSchema } from '#/schemas/fields/address-schema';
import { identifierSchema } from '#/schemas/fields/identifier-schema';
import { icdCodesSchema } from '#/schemas/values/icd-codes';

export const deliverySchema = z.object({
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
  actualDeliveryDate: z.optional(z.iso.date()),
  /**
   * @name `cac:DeliveryLocation`
   */
  deliveryLocation: z.optional(
    z.object({
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
      id: z.optional(
        z.safeExtend(identifierSchema(), {
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
          id: z.string(),
          /**
           * @description The identification scheme identifier of the Deliver to location identifier.
           *
           * @summary Deliver to location identifier identification scheme identifier
           *
           * @name `@schemeID`
           */
          schemeId: z.optional(icdCodesSchema()),
        })
      ),
      /**
       * @description A groupd of business terms providing infomation about the address to which goods and services invoiced were or are delivered.
       *
       * @summary Deliver to address
       *
       * @name `cac:Address`
       */
      address: z.optional(addressSchema),
    })
  ),

  /**
   * @summary Delivery party
   *
   * @name `cac:DeliveryParty`
   */
  deliveryParty: z.optional(
    z.object({
      /**
       * @summary PARTY NAME
       *
       * @name `cac:PartyName`
       */
      partyName: z.object({
        /**
         * @description The name of the party to which the goods and services are delivered.
         *
         * @summary Deliver to party name
         *
         * @name `cbc:Name`
         */
        name: z.string(),
      }),
    })
  ),
});
export type PeppolDelivery = z.infer<typeof deliverySchema>;
