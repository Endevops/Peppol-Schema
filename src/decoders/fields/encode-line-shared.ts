import { Effect, Predicate } from 'effect';

import type { PeppolDocumentLine } from '#/document';

import { encodeAmount } from '#/decoders/fields/encode-amount';
import { encodeIdentifier } from '#/decoders/fields/encode-identifier';
import { encodeInvoiceLinePeriod } from '#/decoders/fields/encode-invoice-line-period';
import { encodeLineAllowanceCharges } from '#/decoders/fields/encode-line-allowance-charges';
import { encodeLinePrice } from '#/decoders/fields/encode-line-price';
import { encodeQuantity } from '#/decoders/fields/encode-quantity';
import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier';
import { encodeTaxCategory } from '#/decoders/fields/encode-tax-category';

export const encodeLineShared = Effect.fn(function* (lineShared: PeppolDocumentLine) {
  return {
    'cbc:ID': lineShared.id,
    'cbc:Note': lineShared.note,
    'cbc:InvoicedQuantity': 'invoicedQuantity' in lineShared ? yield* encodeQuantity(lineShared.invoicedQuantity) : undefined,
    'cbc:CreditedQuantity': 'creditedQuantity' in lineShared ? yield* encodeQuantity(lineShared.creditedQuantity) : undefined,
    'cbc:LineExtensionAmount': yield* encodeAmount(lineShared.lineExtensionAmount),
    'cbc:AccountingCost': lineShared.accountingCost,
    'cac:InvoicePeriod': yield* encodeInvoiceLinePeriod(lineShared.invoicePeriod),
    'cac:OrderLineReference': lineShared.orderLineReference ? { 'cbc:LineID': lineShared.orderLineReference.lineId } : undefined,
    'cac:DocumentReference': Predicate.isNullish(lineShared.documentReference)
      ? undefined
      : yield* Effect.forEach(
          lineShared.documentReference,
          Effect.fn(function* (documentReference) {
            return { 'cbc:DocumentTypeCode': documentReference.documentTypeCode, 'cbc:ID': yield* encodeIdentifier(documentReference) };
          })
        ),
    'cac:AllowanceCharge': yield* encodeLineAllowanceCharges(lineShared.allowanceCharges),
    'cac:Item': {
      'cbc:Description': lineShared.item.description,
      'cbc:Name': lineShared.item.name,
      'cac:BuyersItemIdentification': yield* encodeSimpleIdentifier(lineShared.item.buyersItemIdentification),
      'cac:SellersItemIdentification': yield* encodeSimpleIdentifier(lineShared.item.sellersItemIdentification),
      'cac:StandardItemIdentification': lineShared.item.standardItemIdentification
        ? { 'cbc:ID': yield* encodeIdentifier(lineShared.item.standardItemIdentification.id) }
        : undefined,
      'cac:OriginCountry': lineShared.item.originCountryCode
        ? { 'cbc:IdentificationCode': lineShared.item.originCountryCode.identificationCode }
        : undefined,
      'cac:CommodityClassification': lineShared.item.commodityClassifications?.map(c => ({
        'cbc:ItemClassificationCode': {
          '#text': c.itemClassification.id,
          '@listID': c.itemClassification.listId,
          '@listVersionID': c.itemClassification.listVersionId,
        },
      })),
      'cac:ClassifiedTaxCategory': yield* encodeTaxCategory(lineShared.item.classifiedTaxCategory),
      'cac:AdditionalItemProperty': lineShared.item.additionalItemProperties?.map(p => ({ 'cbc:Name': p.name, 'cbc:Value': p.value })),
    },
    'cac:Price': yield* encodeLinePrice(lineShared.price),
  };
});
