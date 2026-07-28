import type { PeppolDocumentLine } from '#/document';

import { encodeAmount } from '#/decoders/fields/encode-amount';
import { encodeIdentifier } from '#/decoders/fields/encode-identifier';
import { encodeInvoiceLinePeriod } from '#/decoders/fields/encode-invoice-line-period';
import { encodeLineAllowanceCharges } from '#/decoders/fields/encode-line-allowance-charges';
import { encodeLinePrice } from '#/decoders/fields/encode-line-price';
import { encodeQuantity } from '#/decoders/fields/encode-quantity';
import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier';
import { encodeTaxCategory } from '#/decoders/fields/encode-tax-category';

export function encodeLineShared(lineShared: PeppolDocumentLine) {
  return {
    'cbc:ID': lineShared.id,
    'cbc:Note': lineShared.note,
    'cbc:InvoicedQuantity': 'invoicedQuantity' in lineShared ? encodeQuantity(lineShared.invoicedQuantity) : undefined,
    'cbc:CreditedQuantity': 'creditedQuantity' in lineShared ? encodeQuantity(lineShared.creditedQuantity) : undefined,
    'cbc:LineExtensionAmount': encodeAmount(lineShared.lineExtensionAmount),
    'cbc:AccountingCost': lineShared.accountingCost,
    'cac:InvoicePeriod': encodeInvoiceLinePeriod(lineShared.invoicePeriod),
    'cac:OrderLineReference': lineShared.orderLineReference ? { 'cbc:LineID': lineShared.orderLineReference.lineId } : undefined,
    'cac:DocumentReference': lineShared.documentReference?.map(documentReference => ({
      'cbc:DocumentTypeCode': documentReference.documentTypeCode,
      'cbc:ID': encodeIdentifier(documentReference),
    })),
    'cac:AllowanceCharge': encodeLineAllowanceCharges(lineShared.allowanceCharges),
    'cac:Item': {
      'cbc:Description': lineShared.item.description,
      'cbc:Name': lineShared.item.name,
      'cac:BuyersItemIdentification': encodeSimpleIdentifier(lineShared.item.buyersItemIdentification),
      'cac:SellersItemIdentification': encodeSimpleIdentifier(lineShared.item.sellersItemIdentification),
      'cac:StandardItemIdentification': lineShared.item.standardItemIdentification
        ? { 'cbc:ID': encodeIdentifier(lineShared.item.standardItemIdentification.id) }
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
      'cac:ClassifiedTaxCategory': encodeTaxCategory(lineShared.item.classifiedTaxCategory),
      'cac:AdditionalItemProperty': lineShared.item.additionalItemProperties?.map(p => ({ 'cbc:Name': p.name, 'cbc:Value': p.value })),
    },
    'cac:Price': encodeLinePrice(lineShared.price),
  };
}
