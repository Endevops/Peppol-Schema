import { Schema } from 'effect';

import { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema.ts';
import { PeppolItemClassification } from '#/schemas/fields/peppol-item-classification-schema.ts';
import { PeppolTaxCategory } from '#/schemas/fields/peppol-tax-category-schema.ts';
import { CAC_NAMESPACE, CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolIcdCode } from '#/schemas/values/icd-codes-schema.ts';
import { PeppolCountryCodeValue } from '#/schemas/values/peppol-country-code-schema.ts';

/**
 * @description An additional property of the item, expressed as an attribute name and value pair.
 *
 * @example
 *   ```ts
 *   { name: 'Colour', value: 'Blue' }
 *   ```;
 *
 * @see {@link PeppolLineItem}
 */
export class PeppolAdditionalItemProperties extends opaque<PeppolAdditionalItemProperties>()(
  Schema.Struct({
    /**
     * @description The name of the attribute or property of the item.
     *
     * @summary Item attribute name
     *
     * @name cbc:Name
     */
    name: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'Name',
        description: 'The name of the attribute or property of the item.',
        title: 'Item attribute name',
      })
    ),
    /**
     * @description The value of the attribute or property of the item.
     *
     * @summary Item attribute value
     *
     * @name cbc:Value
     */
    value: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'Value',
        description: 'The value of the attribute or property of the item.',
        title: 'Item attribute value',
      })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description A code classifying the item by its type or nature, identified by a scheme such as CPV.
 *
 * @example
 *   ```ts
 *   { itemClassification: { id: '09348023', listId: 'STI' } }
 *   ```;
 *
 * @see {@link PeppolItemClassification}
 */
export class PeppolCommodityClassifications extends opaque<PeppolCommodityClassifications>()(
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
    itemClassification: PeppolItemClassification.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ItemClassificationCode' })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description The country from which the item originates, identified by an ISO 3166-1 country code.
 *
 * @example
 *   ```ts
 *   { identificationCode: 'NO' }
 *   ```;
 *
 * @see {@link PeppolLineItem}
 */
export class PeppolOriginCountryCode extends opaque<PeppolOriginCountryCode>()(
  Schema.Struct({
    /**
     * @description The code identifying the country from which the item originates.
     *
     * @summary Item country of origin
     *
     * @name `cbc:IdentificationCode`
     */
    identificationCode: PeppolCountryCodeValue.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'IdentificationCode' })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description An item identifier based on a registered scheme, such as a GTIN or EAN.
 *
 * @example
 *   ```ts
 *   { id: { id: '21382183120983', schemeId: '0088' } }
 *   ```;
 *
 * @see {@link PeppolIdentifier}
 */
export class PeppolStandardItemIdentification extends opaque<PeppolStandardItemIdentification>()(
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
        id: Schema.String.pipe(Schema.annotate({ xmlValue: true })),
        /**
         * @description The identification scheme identifier of the Item standard identifier.
         *
         * @summary Item standard identifier identification scheme identifier
         *
         * @name `@schemeID`
         */
        schemeId: PeppolIcdCode.pipe(
          Schema.annotate({
            xmlAttribute: true,
            xmlName: 'schemeID',
            description: 'The identification scheme identifier of the Item standard identifier.',
            title: 'Item standard identifier identification scheme identifier',
          })
        ),
      }),
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description An identifier assigned by the Seller for the item.
 *
 * @example
 *   ```ts
 *   { id: '987323' }
 *   ```;
 *
 * @see {@link PeppolLineItem}
 */
export class PeppolSellersItemIdentification extends opaque<PeppolSellersItemIdentification>()(
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
    id: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description An identifier assigned by the Buyer for the item.
 *
 * @example
 *   ```ts
 *   { id: '12345' }
 *   ```;
 *
 * @see {@link PeppolLineItem}
 */
export class PeppolBuyersItemIdentification extends opaque<PeppolBuyersItemIdentification>()(
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
    id: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description The item details for an invoice or credit note line, including its name, identifiers, classification, and line VAT category.
 *
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
    description: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'Description',
        description:
          'A description for an item. The item description allows for descibing the item and its features in more detail than the item name.',
        title: 'Item description',
      }),
      Schema.optional
    ),
    /**
     * @description A name for an item.
     *
     * @summary Item name
     *
     * @name cbc:Name
     */
    name: Schema.String.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'Name', description: 'A name for an item.', title: 'Item name' })
    ),
    /**
     * @summary BUYERS ITEM IDENTIFICATION
     *
     * @name cac:BuyersItemIdentification
     */
    buyersItemIdentification: PeppolBuyersItemIdentification.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'BuyersItemIdentification', title: 'BUYERS ITEM IDENTIFICATION' }),
      Schema.optional
    ),
    /**
     * @summary Sellers item identification
     *
     * @name cac:SellersItemIdentification
     */
    sellersItemIdentification: PeppolSellersItemIdentification.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'SellersItemIdentification', title: 'Sellers item identification' }),
      Schema.optional
    ),
    /**
     * @summary Standard item identification
     *
     * @name cac:StandardItemIdentification
     */
    standardItemIdentification: PeppolStandardItemIdentification.pipe(
      Schema.annotate({
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'StandardItemIdentification',
        title: 'Standard item identification',
      }),
      Schema.optional
    ),
    /**
     * @summary ORIGIN COUNTRY
     *
     * @name `cac:OriginCountry`
     */
    originCountryCode: PeppolOriginCountryCode.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'OriginCountry' }),
      Schema.optional
    ),
    /**
     * @summary COMMODITY CLASSIFICATION
     *
     * @name cac:CommodityClassification (0..n)
     */
    commodityClassifications: Schema.Array(PeppolCommodityClassifications).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'CommodityClassification', title: 'COMMODITY CLASSIFICATION' }),
      Schema.optional
    ),
    /**
     * @description A group of business terms providing information about the VAT applicable for the goods and services invoiced on the Invoice line.
     *
     * @summary LINE VAT INFORMATION
     *
     * @name cac:ClassifiedTaxCategory
     */
    classifiedTaxCategory: PeppolTaxCategory.pipe(
      Schema.annotate({
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'ClassifiedTaxCategory',
        description:
          'A group of business terms providing information about the VAT applicable for the goods and services invoiced on the Invoice line.',
        title: 'LINE VAT INFORMATION',
      })
    ),
    /**
     * @description A group of business terms providing information about properties of the goods and services invoiced.
     *
     * @summary ITEM ATTRIBUTES
     *
     * @name cac:AdditionalItemProperty
     */
    additionalItemProperties: Schema.Array(PeppolAdditionalItemProperties).pipe(
      Schema.annotate({
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'AdditionalItemProperty',
        description: 'A group of business terms providing information about properties of the goods and services invoiced.',
        title: 'ITEM ATTRIBUTES',
      }),
      Schema.optional
    ),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'Item' }), Schema.toStandardSchemaV1)
) {}
