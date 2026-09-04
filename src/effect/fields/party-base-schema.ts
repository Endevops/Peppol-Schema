import { Schema } from 'effect';

import { electronicCodesSchema } from '#/effect/values/eas-codes';
import { icdCodesSchema } from '#/effect/values/icd-codes';

import { addressSchema } from './address-schema';
import { contactSchema } from './contact-schema';
import { identifierSchema } from './identifier-schema';
import { partyLegalEntitySchema } from './party-legal-entity-schema';
import { partyTaxSchemeSchema } from './party-tax-schema';

/**
 * @summary Party common substructure
 *
 * @name cac:Party
 */
export const partyBaseSchema = Schema.Struct({
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
  endpointId: identifierSchema().pipe(
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
      schemeId: electronicCodesSchema(),
    })
  ),
  /**
   * @example
   *   5060012349998;
   *
   * @summary PARTY IDENTIFICATION
   *
   * @name `cac:PartyIdentification`
   */
  partyIdentification: Schema.optionalKey(
    Schema.Struct({
      /**
       * @description An identifier of the Buyer/seller.
       *
       * @summary Buyer/seller identifier
       *
       * @name `cbc:ID`
       */
      id: identifierSchema().pipe(
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
          schemeId: Schema.optionalKey(icdCodesSchema()),
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
  partyName: Schema.optionalKey(
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
  postalAddress: addressSchema,
  /**
   * @remarks
   *   Max 1 for a buyer, max 2 for a seller.
   *
   * @name cac:PartyTaxScheme
   *
   * @cardinality (0..2)
   */
  partyTaxSchemes: Schema.optionalKey(Schema.Array(partyTaxSchemeSchema).check(Schema.isMaxLength(2))),
  /**
   * @name cac:PartyLegalEntity
   */
  partyLegalEntity: partyLegalEntitySchema,
  /**
   * @name cac:Contact
   */
  contact: Schema.optionalKey(contactSchema),
});

export type PeppolPartySchema = typeof partyBaseSchema.Type;
