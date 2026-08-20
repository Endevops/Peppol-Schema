import type { PeppolDocumentLine } from '#/document';
import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolBaseLine } from '#/schemas/fields/base-line-schema';
import type { RecursivePartial } from '#/types';

import { decodeAmount } from '#/decoders/fields/decode-amount';
import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { decodeInvoiceLinePeriod } from '#/decoders/fields/decode-invoice-line-period';
import { decodeLineAllowanceCharges } from '#/decoders/fields/decode-line-allowance-charges';
import { decodeLinePrice } from '#/decoders/fields/decode-line-price';
import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { decodeTaxCategory } from '#/decoders/fields/decode-tax-category';
import { getArray } from '#/helpers/get-array';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

type PeppolDocumentLineItem = PeppolDocumentLine['item'];

export function decodeLineShared(lineShared: XmlNode): RecursivePartial<PeppolBaseLine> {
  const item = getProp(lineShared, 'cac:Item');
  const orderLineReference = getProp(lineShared, 'cac:OrderLineReference');

  return {
    accountingCost: strOrUnd(lineShared, 'cbc:AccountingCost'),
    allowanceCharges: decodeLineAllowanceCharges(lineShared, 'cac:AllowanceCharge'),
    documentReference: getArray(lineShared, 'cac:DocumentReference').map(documentReference => ({
      documentTypeCode: strOrUnd(documentReference, 'cbc:DocumentTypeCode'),
      id: strOrUnd(documentReference, 'cbc:ID'),
      schemeId: strOrUnd(documentReference, 'cbc:ID', '@schemeID'),
    })),
    id: strOrUnd(lineShared, 'cbc:ID'),
    invoicePeriod: decodeInvoiceLinePeriod(lineShared, 'cac:InvoicePeriod'),
    item: {
      additionalItemProperties: getArray(item, 'cac:AdditionalItemProperty').map(n => ({
        name: strOrUnd(n, 'cbc:Name'),
        value: strOrUnd(n, 'cbc:Value'),
      })),
      buyersItemIdentification: decodeSimpleIdentifer(item, 'cac:BuyersItemIdentification'),
      classifiedTaxCategory: decodeTaxCategory(item, 'cac:ClassifiedTaxCategory'),
      commodityClassifications: getArray(item, 'cac:CommodityClassification').map(commodityClassification => ({
        itemClassification: {
          id: strOrUnd(commodityClassification, 'cbc:ItemClassificationCode'),
          listId: strOrUnd(commodityClassification, 'cbc:ItemClassificationCode', '@listID'),
          listVersionId: strOrUnd(commodityClassification, 'cbc:ItemClassificationCode', '@listVersionID'),
        },
      })),
      description: strOrUnd(item, 'cbc:Description'),
      name: strOrUnd(item, 'cbc:Name'),
      originCountryCode: decodeOriginCountryCode(item, 'cac:OriginCountry'),
      sellersItemIdentification: decodeSimpleIdentifer(item, 'cac:SellersItemIdentification'),
      standardItemIdentification: decodeStandardItem(item, 'cac:StandardItemIdentification'),
    },
    lineExtensionAmount: decodeAmount(lineShared, 'cbc:LineExtensionAmount'),
    note: strOrUnd(lineShared, 'cbc:Note'),
    orderLineReference: orderLineReference ? { lineId: strOrUnd(orderLineReference, 'cbc:LineID') } : undefined,
    price: decodeLinePrice(lineShared, 'cac:Price'),
  };
}

function decodeStandardItem(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolDocumentLineItem['standardItemIdentification']> {
  const val = getProp(node, ...path);
  if (!val) return;
  return { id: decodeIdentifier(val, 'cbc:ID') };
}

function decodeOriginCountryCode(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolDocumentLineItem['originCountryCode']> {
  const country = getProp(node, ...path);
  if (!country) return undefined;
  return { identificationCode: strOrUnd(country, 'cbc:IdentificationCode') };
}
