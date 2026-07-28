import * as z from 'zod/mini';
import { addressSchema } from '#/schemas/fields/address-schema';
import { contactSchema } from '#/schemas/fields/contact-schema';
import { identifierSchema } from '#/schemas/fields/identifier-schema';
import { partyLegalEntitySchema } from '#/schemas/fields/party-legal-entity-schema';
import { partyTaxSchemeSchema } from '#/schemas/fields/party-tax-schema';
import { electronicCodesSchema } from '#/schemas/values/eas-codes';
import { icdCodesSchema } from '#/schemas/values/icd-codes';

/**
 * @summary Party common substructure
 *
 * @name cac:Party
 */
export const partyBaseSchema = z.object({
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
  endpointId: z.safeExtend(identifierSchema(), {
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
    id: z.string(),
    /**
     * @description The identification scheme identifier of the Seller/Buyer electronic address.
     *
     * @summary Seller/Buyer electronic address identification scheme identifier
     *
     * @name `@schemeID`
     */
    schemeId: electronicCodesSchema(),
  }),
  /**
   * @example
   *   5060012349998;
   *
   * @summary PARTY IDENTIFICATION
   *
   * @name `cac:PartyIdentification`
   */
  partyIdentification: z.optional(
    z.object({
      /**
       * @description An identifier of the Buyer/seller.
       *
       * @summary Buyer/seller identifier
       *
       * @name `cbc:ID`
       */
      id: z.safeExtend(identifierSchema(), {
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
        id: z.string(),
        /**
         * @description The identification scheme identifier of the Seller/Buyer electronic address.
         *
         * @summary Seller/Buyer electronic address identification scheme identifier
         *
         * @name `@schemeID`
         */
        schemeId: z.optional(icdCodesSchema()),
      }),
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
  partyName: z.optional(
    z.object({
      /**
       * @description A name by which the Buyer/Seller is known, other than Buyer/Seller name (also known as Business name).
       *
       * @example
       *   `Trading Name`;
       *
       * @summary Buyer/Seller trading name
       */
      name: z.string(),
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
  partyTaxSchemes: z.optional(z.array(partyTaxSchemeSchema).check(z.maxLength(2))),
  /**
   * @name cac:PartyLegalEntity
   */
  partyLegalEntity: partyLegalEntitySchema,
  /**
   * @name cac:Contact
   */
  contact: z.optional(contactSchema),
});
export type PeppolPartySchema = z.infer<typeof partyBaseSchema>;
