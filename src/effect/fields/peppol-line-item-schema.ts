import { Schema } from 'effect';

import { PeppolIdentifier } from '#/effect/fields/peppol-identifier-schema';
import { PeppolItemClassification } from '#/effect/fields/peppol-item-classification-schema';
import { PeppolTaxCategory } from '#/effect/fields/peppol-tax-category-schema';
import { opaque } from '#/effect/utils/opaque';
import { icdCodesSchema } from '#/effect/values/icd-codes-schema';
import { peppolCountryCodeSchema } from '#/effect/values/peppol-country-code-schema';

class PeppolAdditionalItemProperties extends opaque<PeppolAdditionalItemProperties>()(
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
) {}

class PeppolCommodityClassifications extends opaque<PeppolCommodityClassifications>()(
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
    itemClassification: PeppolItemClassification,
  })
) {}

class PeppolOriginCountryCode extends opaque<PeppolOriginCountryCode>()(
  Schema.Struct({
    /**
     * @description The code identifying the country from which the item originates.
     *
     * @summary Item country of origin
     *
     * @name `cbc:IdentificationCode`
     */
    identificationCode: peppolCountryCodeSchema,
  })
) {}

class PeppolStandardItemIdentification extends opaque<PeppolStandardItemIdentification>()(
  Schema.Struct({
    /**
     * @description An item identifier based on a registered scheme.
     *
     * @summary Item standard identifier
     *
     * @name `cbc:ID`
     */
    id: PeppolIdentifier.pipe(
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
        schemeId: icdCodesSchema,
      })
    ),
  })
) {}

class PeppolSellersItemIdentification extends opaque<PeppolSellersItemIdentification>()(
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
) {}

class PeppolBuyersItemIdentification extends opaque<PeppolBuyersItemIdentification>()(
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
) {}

/**
 * @summary Item details on invoice/credit-note line
 *
 * @name cac:Item
 */
export class PeppolLineItem extends opaque<PeppolLineItem>()(
  Schema.Struct({
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
    buyersItemIdentification: Schema.optional(PeppolBuyersItemIdentification),
    /**
     * @summary Sellers item identification
     *
     * @name cac:SellersItemIdentification
     */
    sellersItemIdentification: Schema.optional(PeppolSellersItemIdentification),
    /**
     * @summary Standard item identification
     *
     * @name cac:StandardItemIdentification
     */
    standardItemIdentification: Schema.optional(PeppolStandardItemIdentification),
    /**
     * @summary ORIGIN COUNTRY
     *
     * @name `cac:OriginCountry`
     */
    originCountryCode: Schema.optional(PeppolOriginCountryCode),
    /**
     * @summary COMMODITY CLASSIFICATION
     *
     * @name cac:CommodityClassification (0..n)
     */
    commodityClassifications: Schema.optional(Schema.Array(PeppolCommodityClassifications)),
    /**
     * @description A group of business terms providing information about the VAT applicable for the goods and services invoiced on the Invoice line.
     *
     * @summary LINE VAT INFORMATION
     *
     * @name cac:ClassifiedTaxCategory
     */
    classifiedTaxCategory: PeppolTaxCategory,
    /**
     * @description A group of business terms providing information about properties of the goods and services invoiced.
     *
     * @summary ITEM ATTRIBUTES
     *
     * @name cac:AdditionalItemProperty
     */
    additionalItemProperties: Schema.optional(Schema.Array(PeppolAdditionalItemProperties)),
  })
) {}

export type PeppolItem = PeppolLineItem;
