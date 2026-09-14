import { Schema } from 'effect';

import { PeppolAddress } from '#/schemas/fields/peppol-address-schema';
import { PeppolContact } from '#/schemas/fields/peppol-contact-schema';
import { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema';
import { PeppolPartyLegalEntity } from '#/schemas/fields/peppol-party-legal-entity-schema';
import { PeppolPartyTaxScheme } from '#/schemas/fields/peppol-party-tax-scheme-schema';
import { opaque } from '#/schemas/utils/opaque';
import { electronicCodesSchema } from '#/schemas/values/electronic-codes-schema';
import { icdCodesSchema } from '#/schemas/values/icd-codes-schema';

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
    name: Schema.String,
  })
) {}

export class PeppolPartyIdentification extends opaque<PeppolPartyIdentification>()(
  Schema.Struct({
    /**
     * @description An identifier of the Buyer/seller.
     *
     * @summary Buyer/seller identifier
     *
     * @name `cbc:ID`
     */
    id: PeppolIdentifier.pipe(
      Schema.fieldsAssign({
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
        id: Schema.String,
        /**
         * @description The identification scheme identifier of the Seller/Buyer electronic address.
         *
         * @summary Seller/Buyer electronic address identification scheme identifier
         *
         * @name `@schemeID`
         */
        schemeId: Schema.optional(icdCodesSchema),
      })
    ),
  })
) {}

export class PeppolPartyEndpointId extends opaque<PeppolPartyEndpointId>()(
  PeppolIdentifier.pipe(
    Schema.fieldsAssign({
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
      id: Schema.String,
      /**
       * @description The identification scheme identifier of the Seller/Buyer electronic address.
       *
       * @summary Seller/Buyer electronic address identification scheme identifier
       *
       * @name `@schemeID`
       */
      schemeId: electronicCodesSchema,
    })
  )
) {}

/**
 * @summary Party common substructure
 *
 * @name cac:Party
 */
export class PeppolPartySchema extends opaque<PeppolPartySchema>()(
  Schema.Struct({
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
    endpointId: PeppolPartyEndpointId,
    /**
     * @example
     *   5060012349998;
     *
     * @summary PARTY IDENTIFICATION
     *
     * @name `cac:PartyIdentification`
     */
    partyIdentification: Schema.optional(PeppolPartyIdentification),
    /**
     * @example
     *   Seller Business Name AS
     *
     * @summary PARTY NAME
     *
     * @name cac:PartyName
     */
    partyName: Schema.optional(PeppolPartyName),
    /**
     * @name cac:PostalAddress
     */
    postalAddress: PeppolAddress,
    /**
     * @remarks
     *   Max 1 for a buyer, max 2 for a seller.
     *
     * @name cac:PartyTaxScheme
     *
     * @cardinality (0..2)
     */
    partyTaxSchemes: Schema.optional(Schema.Array(PeppolPartyTaxScheme).check(Schema.isMaxLength(2))),
    /**
     * @name cac:PartyLegalEntity
     */
    partyLegalEntity: PeppolPartyLegalEntity,
    /**
     * @name cac:Contact
     */
    contact: Schema.optional(PeppolContact),
  })
) {}
