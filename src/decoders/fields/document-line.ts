import { decodeLineAllowanceCharges, decodeTaxCategory, encodeLineAllowanceCharges, encodeTaxCategory } from '#/decoders/fields/allowance-charge';
import { decodeAmount, encodeAmount } from '#/decoders/fields/amount';
import { decodeSimpleIdentifer, encodeSimpleIdentifier } from '#/decoders/fields/id';
import { decodeIdentifier, encodeIdentifier } from '#/decoders/fields/identifier';
import { decodeInvoiceLinePeriod, encodeInvoiceLinePeriod } from '#/decoders/fields/invoice-period';
import { decodeLinePrice, encodeLinePrice } from '#/decoders/fields/price';
import { decodeQuantity, encodeQuantity } from '#/decoders/fields/quantity';
import type { PeppolDocumentLine } from '#/document';
import { getArray, getProp, strOrUnd } from '#/helpers';
import type { XmlNode } from '#/helpers';
import type { PeppolBaseLine } from '#/schemas/fields/base-line-schema';
import type { PeppolCreditNoteLine } from '#/schemas/fields/credit-note-line-schema';
import type { PeppolInvoiceLine } from '#/schemas/fields/invoice-line-schema';
import type { RecursivePartial } from '#/types';

type PeppolDocumentLineItem = PeppolDocumentLine['item'];

export function decodeInvoiceLines(doc: XmlNode, ...path: Array<string>): Array<RecursivePartial<PeppolInvoiceLine>> | undefined {
  const arr = getArray(doc, ...path);
  if (!arr.length) return undefined;

  return arr.map(lineNode => {
    const shared = decodeLineShared(lineNode);
    return { ...shared, invoicedQuantity: decodeQuantity(lineNode, 'cbc:InvoicedQuantity') };
  });
}

export function decodeCreditNoteLines(doc: XmlNode, ...path: Array<string>): Array<RecursivePartial<PeppolCreditNoteLine>> | undefined {
  const arr = getArray(doc, ...path);
  if (!arr.length) return undefined;

  return arr.map(lineNode => {
    const shared = decodeLineShared(lineNode);
    return { ...shared, creditedQuantity: decodeQuantity(lineNode, 'cbc:CreditedQuantity')! };
  });
}

function decodeLineShared(lineShared: XmlNode): RecursivePartial<PeppolBaseLine> {
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

export function encodeInvoiceLines(invoiceLines: Array<PeppolInvoiceLine>) {
  if (!invoiceLines.length) return undefined;

  return invoiceLines.map(encodeLineShared);
}

export function encodeCreditNoteLines(creditNoteLines: Array<PeppolCreditNoteLine>) {
  if (!creditNoteLines.length) return undefined;

  return creditNoteLines.map(encodeLineShared);
}

function encodeLineShared(lineShared: PeppolDocumentLine) {
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
