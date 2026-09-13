import { Schema } from 'effect';

import { peppolAddressSchema } from '#/effect/fields/peppol-address-schema';
import { peppolContactSchema } from '#/effect/fields/peppol-contact-schema';
import { peppolIdentifierSchema } from '#/effect/fields/peppol-identifier-schema';
import { peppolPartyLegalEntitySchema } from '#/effect/fields/peppol-party-legal-entity-schema';
import { peppolPartyTaxSchemeSchema } from '#/effect/fields/peppol-party-tax-scheme-schema';
import { electronicCodesSchema } from '#/effect/values/electronic-codes-schema';
import { icdCodesSchema } from '#/effect/values/icd-codes-schema';

export const peppolPartyEndpointIdSchema = peppolIdentifierSchema.pipe(
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
);

/**
 * @summary Party common substructure
 *
 * @name cac:Party
 */
export const peppolPartyBaseSchema = Schema.Struct({
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
  endpointId: peppolPartyEndpointIdSchema,
  /**
   * @example
   *   5060012349998;
   *
   * @summary PARTY IDENTIFICATION
   *
   * @name `cac:PartyIdentification`
   */
  partyIdentification: Schema.optional(
    Schema.Struct({
      /**
       * @description An identifier of the Buyer/seller.
       *
       * @summary Buyer/seller identifier
       *
       * @name `cbc:ID`
       */
      id: peppolIdentifierSchema.pipe(
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
  ),
  /**
   * @example
   *   Seller Business Name AS
   *
   * @summary PARTY NAME
   *
   * @name cac:PartyName
   */
  partyName: Schema.optional(
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
  ),
  /**
   * @name cac:PostalAddress
   */
  postalAddress: peppolAddressSchema,
  /**
   * @remarks
   *   Max 1 for a buyer, max 2 for a seller.
   *
   * @name cac:PartyTaxScheme
   *
   * @cardinality (0..2)
   */
  partyTaxSchemes: Schema.optional(Schema.Array(peppolPartyTaxSchemeSchema).check(Schema.isMaxLength(2))),
  /**
   * @name cac:PartyLegalEntity
   */
  partyLegalEntity: peppolPartyLegalEntitySchema,
  /**
   * @name cac:Contact
   */
  contact: Schema.optional(peppolContactSchema),
});

export type PeppolPartySchema = typeof peppolPartyBaseSchema.Type;
