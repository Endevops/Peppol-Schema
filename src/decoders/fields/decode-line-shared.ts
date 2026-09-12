import { Effect, Predicate } from 'effect';

import type { PeppolDocumentLine } from '#/document';
import type { PeppolNodeError } from '#/helpers/errors';
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

export const decodeLineShared = Effect.fn(function* (lineShared: XmlNode): Effect.fn.Return<RecursivePartial<PeppolBaseLine>, PeppolNodeError> {
  const item = yield* getProp(lineShared, 'cac:Item');
  const orderLineReference = yield* getProp(lineShared, 'cac:OrderLineReference');

  return {
    accountingCost: yield* strOrUnd(lineShared, 'cbc:AccountingCost'),
    allowanceCharges: yield* decodeLineAllowanceCharges(lineShared, 'cac:AllowanceCharge'),
    documentReference: yield* Effect.forEach(
      yield* getArray(lineShared, 'cac:DocumentReference'),
      Effect.fn(function* (documentReference: XmlNode) {
        return {
          documentTypeCode: yield* strOrUnd(documentReference, 'cbc:DocumentTypeCode'),
          id: yield* strOrUnd(documentReference, 'cbc:ID'),
          schemeId: yield* strOrUnd(documentReference, 'cbc:ID', '@schemeID'),
        };
      })
    ),
    id: yield* strOrUnd(lineShared, 'cbc:ID'),
    invoicePeriod: yield* decodeInvoiceLinePeriod(lineShared, 'cac:InvoicePeriod'),
    item: {
      additionalItemProperties: yield* Effect.forEach(
        yield* getArray(item, 'cac:AdditionalItemProperty'),
        Effect.fn(function* (n: XmlNode) {
          return { name: yield* strOrUnd(n, 'cbc:Name'), value: yield* strOrUnd(n, 'cbc:Value') };
        })
      ),
      buyersItemIdentification: yield* decodeSimpleIdentifer(item, 'cac:BuyersItemIdentification'),
      classifiedTaxCategory: yield* decodeTaxCategory(item, 'cac:ClassifiedTaxCategory'),
      commodityClassifications: yield* Effect.forEach(
        yield* getArray(item, 'cac:CommodityClassification'),
        Effect.fn(function* (commodityClassification: XmlNode) {
          return {
            itemClassification: {
              id: yield* strOrUnd(commodityClassification, 'cbc:ItemClassificationCode'),
              listId: yield* strOrUnd(commodityClassification, 'cbc:ItemClassificationCode', '@listID'),
              listVersionId: yield* strOrUnd(commodityClassification, 'cbc:ItemClassificationCode', '@listVersionID'),
            },
          };
        })
      ),
      description: yield* strOrUnd(item, 'cbc:Description'),
      name: yield* strOrUnd(item, 'cbc:Name'),
      originCountryCode: yield* decodeOriginCountryCode(item, 'cac:OriginCountry'),
      sellersItemIdentification: yield* decodeSimpleIdentifer(item, 'cac:SellersItemIdentification'),
      standardItemIdentification: yield* decodeStandardItem(item, 'cac:StandardItemIdentification'),
    },
    lineExtensionAmount: yield* decodeAmount(lineShared, 'cbc:LineExtensionAmount'),
    note: yield* strOrUnd(lineShared, 'cbc:Note'),
    orderLineReference: Predicate.isNotNullish(orderLineReference) ? { lineId: yield* strOrUnd(orderLineReference, 'cbc:LineID') } : undefined,
    price: yield* decodeLinePrice(lineShared, 'cac:Price'),
  };
});

const decodeStandardItem = Effect.fn(function* (
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolDocumentLineItem['standardItemIdentification']>> {
  const val = yield* getProp(node, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return { id: yield* decodeIdentifier(val, 'cbc:ID') };
});

const decodeOriginCountryCode = Effect.fn(function* (
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolDocumentLineItem['originCountryCode']>> {
  const country = yield* getProp(node, ...path);
  if (Predicate.isNullish(country)) return undefined;
  return { identificationCode: yield* strOrUnd(country, 'cbc:IdentificationCode') };
});
