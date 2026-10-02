import { Schema } from 'effect';

import { PeppolAddress } from '#/schemas/fields/peppol-address-schema.ts';
import { PeppolContact } from '#/schemas/fields/peppol-contact-schema.ts';
import { PeppolPartyLegalEntity } from '#/schemas/fields/peppol-party-legal-entity-schema.ts';
import { PeppolPartyTaxScheme } from '#/schemas/fields/peppol-party-tax-scheme-schema.ts';
import { CAC_NAMESPACE, CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { StringIdentifierSchema } from '#/schemas/utils/string-identifier-schema.ts';
import { PeppolElectronicAddressCode } from '#/schemas/values/electronic-codes-schema.ts';
import { PeppolIcdCode } from '#/schemas/values/icd-codes-schema.ts';

/**
 * @description A name by which the Buyer or Seller is known, other than its registered name.
 *
 * @example
 *   ```ts
 *   { name: 'SupplierTradingName Ltd.' }
 *   ```;
 *
 * @see {@link PeppolPartySchema}
 */
export class PeppolPartyName extends opaque<PeppolPartyName>()(
  Schema.Struct({
    /**
     * @description A name by which the Buyer/Seller is known, other than Buyer/Seller name (also known as Business name).
     *
     * @example
     *   `Trading Name`;
     *
     * @summary Buyer/Seller trading name
     */
    name: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'Name',
        description: 'A name by which the Buyer/Seller is known, other than Buyer/Seller name (also known as Business name).',
        title: 'Buyer/Seller trading name',
      })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description An identifier of the Buyer or Seller, with an optional identification scheme.
 *
 * @example
 *   ```ts
 *   { id: { id: '99887766', schemeId: '0088' } }
 *   ```;
 *
 * @see {@link PeppolPartySchema}
 */
export class PeppolPartyIdentification extends opaque<PeppolPartyIdentification>()(
  Schema.Struct({
    /**
     * @description An identifier of the Buyer/seller.
     *
     * @summary Buyer/seller identifier
     *
     * @name `cbc:ID`
     */
    id: StringIdentifierSchema(
      Schema.Struct({
        /**
         * @description Identifies the Seller/buyer's electronic address to which the application level response to the invoice may be delivered.
         *
         * @example
         *   7300010000001;
         *
         * @summary Seller/Buyer electronic address
         *
         * @name `#text`
         */
        id: Schema.String.pipe(Schema.annotate({ xmlValue: true })),
        /**
         * @description The identification scheme identifier of the Seller/Buyer electronic address.
         *
         * @summary Seller/Buyer electronic address identification scheme identifier
         *
         * @name `@schemeID`
         */
        schemeId: PeppolIcdCode.pipe(
          Schema.annotate({
            xmlAttribute: true,
            xmlName: 'schemeID',
            description: 'The identification scheme identifier of the Seller/Buyer electronic address.',
            title: 'Seller/Buyer electronic address identification scheme identifier',
          }),
          Schema.optional
        ),
      })
    ).pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description The Buyer or Seller electronic address to which the application level response to the invoice may be delivered.
 *
 * @example
 *   ```ts
 *   { id: '9482348239847239874', schemeId: '0088' }
 *   ```;
 *
 * @see {@link PeppolPartySchema}
 */
export class PeppolPartyEndpointId extends opaque<PeppolPartyEndpointId>()(
  Schema.Struct({
    /**
     * @description Identifies the Seller/buyer's electronic address to which the application level response to the invoice may be delivered.
     *
     * @example
     *   7300010000001;
     *
     * @summary Seller/Buyer electronic address
     *
     * @name `#text`
     */
    id: Schema.String.pipe(Schema.annotate({ xmlValue: true })),
    /**
     * @description The identification scheme identifier of the Seller/Buyer electronic address.
     *
     * @summary Seller/Buyer electronic address identification scheme identifier
     *
     * @name `@schemeID`
     */
    schemeId: PeppolElectronicAddressCode.pipe(
      Schema.annotate({
        xmlAttribute: true,
        xmlName: 'schemeID',
        description: 'The identification scheme identifier of the Seller/Buyer electronic address.',
        title: 'Seller/Buyer electronic address identification scheme identifier',
      })
    ),
  }).pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'EndpointID' }), Schema.toStandardSchemaV1)
) {}

/**
 * @description The common party substructure shared by the supplier, customer, and other party roles.
 *
 * @summary Party common substructure
 *
 * @name cac:Party
 */
export class PeppolPartySchema extends opaque<PeppolPartySchema>()(
  Schema.Struct({
    party: Schema.Struct({
      /**
       * @description Identifies the Seller/buyer's electronic address to which the application level response to the invoice may be delivered.
       *
       * @example
       *   7300010000001;
       *
       * @summary Seller/Buyer electronic address
       *
       * @name `cbc:EndpointID`
       */
      endpointId: PeppolPartyEndpointId.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'EndpointID' })),
      /**
       * @example
       *   5060012349998;
       *
       * @summary PARTY IDENTIFICATION
       *
       * @name `cac:PartyIdentification`
       */
      partyIdentification: PeppolPartyIdentification.pipe(
        Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'PartyIdentification' }),
        Schema.optional
      ),
      /**
       * @example
       *   Seller Business Name AS
       *
       * @summary PARTY NAME
       *
       * @name cac:PartyName
       */
      partyName: PeppolPartyName.pipe(
        Schema.annotate({
          xmlNamespace: CAC_NAMESPACE,
          xmlPrefix: 'cac',
          xmlName: 'PartyName',
          title: 'PARTY NAME',
          examples: ['Seller Business Name AS'] as unknown as ReadonlyArray<never>,
        }),
        Schema.optional
      ),
      /**
       * @name cac:PostalAddress
       */
      postalAddress: PeppolAddress.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'PostalAddress' })),
      /**
       * @remarks
       *   Max 1 for a buyer, max 2 for a seller.
       *
       * @name cac:PartyTaxScheme
       *
       * @cardinality (0..2)
       */
      partyTaxSchemes: Schema.Array(PeppolPartyTaxScheme)
        .check(Schema.isMaxLength(2))
        .pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'PartyTaxScheme' }), Schema.optional),
      /**
       * @name cac:PartyLegalEntity
       */
      partyLegalEntity: PeppolPartyLegalEntity,
      /**
       * @name cac:Contact
       */
      contact: PeppolContact.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'Contact' }), Schema.optional),
    }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'Party' })),
  }).pipe(Schema.toStandardSchemaV1)
) {}
