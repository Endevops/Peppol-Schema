import * as z from 'zod/mini';
import { identifierSchema } from '#/schemas/fields/identifier-schema';
import { itemClassificationSchema } from '#/schemas/fields/list-identifier-schema';
import { taxCategorySchema } from '#/schemas/fields/tax-category-schema';
import { countryCodeSchema } from '#/schemas/values/country-code';
import { icdCodesSchema } from '#/schemas/values/icd-codes';

/**
 * @summary Item details on invoice/credit-note line
 *
 * @name cac:Item
 */
export const lineItemSchema = z.object({
  /**
   * @description A description for an item. The item description allows for descibing the item and its features in more detail than the item name.
   *
   * @summary Item description
   *
   * @name cbc:Description
   */
  description: z.optional(z.string()),
  /**
   * @description A name for an item.
   *
   * @summary Item name
   *
   * @name cbc:Name
   */
  name: z.string(),
  /**
   * @summary BUYERS ITEM IDENTIFICATION
   *
   * @name cac:BuyersItemIdentification
   */
  buyersItemIdentification: z.optional(
    z.object({
      /**
       * @description An identifier, assigned by the Buyer, for the item.
       *
       * @example
       *   `12345`;
       *
       * @summary Item Buyer's identifier
       *
       * @name `cbc:ID`
       */
      id: z.string(),
    })
  ),
  /**
   * @summary Sellers item identification
   *
   * @name cac:SellersItemIdentification
   */
  sellersItemIdentification: z.optional(
    z.object({
      /**
       * @description An identifier, assigned by the Seller, for the item.
       *
       * @example
       *   `987323`;
       *
       * @summary Item Seller's identifier
       *
       * @name `cbc:ID`
       */
      id: z.string(),
    })
  ),
  /**
   * @summary Standard item identification
   *
   * @name cac:StandardItemIdentification
   */
  standardItemIdentification: z.optional(
    z.object({
      /**
       * @description An item identifier based on a registered scheme.
       *
       * @summary Item standard identifier
       *
       * @name `cbc:ID`
       */
      id: z.safeExtend(identifierSchema(), {
        /**
         * @description An item identifier based on a registered scheme.
         *
         * @summary Item standard identifier
         *
         * @name `#text`
         */
        id: z.string(),
        /**
         * @description The identification scheme identifier of the Item standard identifier.
         *
         * @summary Item standard identifier identification scheme identifier
         *
         * @name `@schemeID`
         */
        schemeId: icdCodesSchema(),
      }),
    })
  ),
  /**
   * @summary ORIGIN COUNTRY
   *
   * @name `cac:OriginCountry`
   */
  originCountryCode: z.optional(
    z.object({
      /**
       * @description The code identifying the country from which the item originates.
       *
       * @summary Item country of origin
       *
       * @name `cbc:IdentificationCode`
       */
      identificationCode: countryCodeSchema,
    })
  ),
  /**
   * @summary COMMODITY CLASSIFICATION
   *
   * @name cac:CommodityClassification (0..n)
   */
  commodityClassifications: z.optional(
    z.array(
      z.object({
        /**
         * @description A code for classifying the item by its type or nature.
         *
         * @example
         *   `9873242`;
         *
         * @summary Item classification identifier
         *
         * @name `cbc:ItemClassificationCode`
         */
        itemClassification: itemClassificationSchema,
      })
    )
  ),
  /**
   * @description A group of business terms providing information about the VAT applicable for the goods and services invoiced on the Invoice line.
   *
   * @summary LINE VAT INFORMATION
   *
   * @name cac:ClassifiedTaxCategory
   */
  classifiedTaxCategory: taxCategorySchema,
  /**
   * @description A group of business terms providing information about properties of the goods and services invoiced.
   *
   * @summary ITEM ATTRIBUTES
   *
   * @name cac:AdditionalItemProperty
   */
  additionalItemProperties: z.optional(
    z.array(
      z.object({
        /**
         * @description The name of the attribute or property of the item.
         *
         * @summary Item attribute name
         *
         * @name cbc:Name
         */
        name: z.string(),
        /**
         * @description The value of the attribute or property of the item.
         *
         * @summary Item attribute value
         *
         * @name cbc:Value
         */
        value: z.string(),
      })
    )
  ),
});

export type PeppolItem = z.infer<typeof lineItemSchema>;
