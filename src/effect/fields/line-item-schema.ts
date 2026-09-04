import { Schema } from 'effect';

import { countryCodeSchema } from '#/effect/values/country-code';
import { icdCodesSchema } from '#/effect/values/icd-codes';

import { identifierSchema } from './identifier-schema';
import { itemClassificationSchema } from './list-identifier-schema';
import { taxCategorySchema } from './tax-category-schema';

/**
 * @summary Item details on invoice/credit-note line
 *
 * @name cac:Item
 */
export const lineItemSchema = Schema.Struct({
  /**
   * @description A description for an item. The item description allows for descibing the item and its features in more detail than the item name.
   *
   * @summary Item description
   *
   * @name cbc:Description
   */
  description: Schema.optional(Schema.String),
  /**
   * @description A name for an item.
   *
   * @summary Item name
   *
   * @name cbc:Name
   */
  name: Schema.String,
  /**
   * @summary BUYERS ITEM IDENTIFICATION
   *
   * @name cac:BuyersItemIdentification
   */
  buyersItemIdentification: Schema.optional(
    Schema.Struct({
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
      id: Schema.String,
    })
  ),
  /**
   * @summary Sellers item identification
   *
   * @name cac:SellersItemIdentification
   */
  sellersItemIdentification: Schema.optional(
    Schema.Struct({
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
      id: Schema.String,
    })
  ),
  /**
   * @summary Standard item identification
   *
   * @name cac:StandardItemIdentification
   */
  standardItemIdentification: Schema.optional(
    Schema.Struct({
      /**
       * @description An item identifier based on a registered scheme.
       *
       * @summary Item standard identifier
       *
       * @name `cbc:ID`
       */
      id: identifierSchema().pipe(
        Schema.fieldsAssign({
          /**
           * @description An item identifier based on a registered scheme.
           *
           * @summary Item standard identifier
           *
           * @name `#text`
           */
          id: Schema.String,
          /**
           * @description The identification scheme identifier of the Item standard identifier.
           *
           * @summary Item standard identifier identification scheme identifier
           *
           * @name `@schemeID`
           */
          schemeId: icdCodesSchema(),
        })
      ),
    })
  ),
  /**
   * @summary ORIGIN COUNTRY
   *
   * @name `cac:OriginCountry`
   */
  originCountryCode: Schema.optional(
    Schema.Struct({
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
  commodityClassifications: Schema.optional(
    Schema.Array(
      Schema.Struct({
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
  additionalItemProperties: Schema.optional(
    Schema.Array(
      Schema.Struct({
        /**
         * @description The name of the attribute or property of the item.
         *
         * @summary Item attribute name
         *
         * @name cbc:Name
         */
        name: Schema.String,
        /**
         * @description The value of the attribute or property of the item.
         *
         * @summary Item attribute value
         *
         * @name cbc:Value
         */
        value: Schema.String,
      })
    )
  ),
});

export type PeppolItem = typeof lineItemSchema.Type;
