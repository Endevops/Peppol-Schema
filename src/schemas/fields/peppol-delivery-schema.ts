import { Schema } from 'effect';

import { CAC_NAMESPACE, CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { StringIdentifierSchema } from '#/schemas/utils/string-identifier-schema.ts';
import { PeppolIcdCode } from '#/schemas/values/icd-codes-schema.ts';

import { PeppolAddress } from './peppol-address-schema.ts';

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
    name: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'Name' })),
  }).pipe(Schema.toStandardSchemaV1)
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
    partyName: PeppolDeliveryPartyPartyName.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'PartyName' })),
  }).pipe(Schema.toStandardSchemaV1)
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
    id: StringIdentifierSchema(
      Schema.Struct({
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
        id: Schema.String.pipe(Schema.annotate({ xmlValue: true })),
        /**
         * @description The identification scheme identifier of the Deliver to location identifier.
         *
         * @summary Deliver to location identifier identification scheme identifier
         *
         * @name `@schemeID`
         */
        schemeId: Schema.optional(PeppolIcdCode).pipe(
          Schema.annotate({
            xmlAttribute: true,
            xmlName: 'schemeID',
            description: 'The identification scheme identifier of the Deliver to location identifier.',
            title: 'Deliver to location identifier identification scheme identifier',
          })
        ),
      })
    ).pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' }), Schema.optional),
    /**
     * @description A groupd of business terms providing infomation about the address to which goods and services invoiced were or are delivered.
     *
     * @summary Deliver to address
     *
     * @name `cac:Address`
     */
    address: PeppolAddress.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'Address' }), Schema.optional),
  }).pipe(Schema.toStandardSchemaV1)
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
    actualDeliveryDate: PeppolIsoDateString.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ActualDeliveryDate',
        description: 'Th edate on which the supply of goods or services was made or completed.',
        title: 'Actual delivery date',
        examples: ['2017 - 12 - 01'] as unknown as ReadonlyArray<never>,
      }),
      Schema.optional
    ),
    /**
     * @name `cac:DeliveryLocation`
     */
    deliveryLocation: PeppolDeliveryLocation.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'DeliveryLocation' }),
      Schema.optional
    ),

    /**
     * @summary Delivery party
     *
     * @name `cac:DeliveryParty`
     */
    deliveryParty: PeppolDeliveryParty.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'DeliveryParty' }),
      Schema.optional
    ),
  }).pipe(
    Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'Delivery', description: 'DELIVERY INFORMATION.' }),
    Schema.toStandardSchemaV1
  )
) {}
