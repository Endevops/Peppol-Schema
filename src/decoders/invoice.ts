import { decodeAdditionalDocumentReferences, encodeAdditionalDocumentReferences } from '#/decoders/fields/additional-document-reference';
import { decodeAllowanceCharges, encodeAllowanceCharges } from '#/decoders/fields/allowance-charge';
import { decodeBillingReferences, encodeBillingReferences } from '#/decoders/fields/billing-references';
import { decodeDelivery, encodeDelivery } from '#/decoders/fields/delivery';
import { decodeInvoiceLines, encodeInvoiceLines } from '#/decoders/fields/document-line';
import { decodeSimpleIdentifer, encodeSimpleIdentifier } from '#/decoders/fields/id';
import { decodeInvoicePeriod, encodeInvoicePeriod } from '#/decoders/fields/invoice-period';
import { decodeLegalMonetaryTotal, encodeLegalMonetaryTotal } from '#/decoders/fields/legal-monetary-total';
import { decodeOrderReference, encodeOrderReference } from '#/decoders/fields/order-reference';
import { decodeParty, encodeParty } from '#/decoders/fields/party';
import { decodePayeeParty, encodePayeeParty } from '#/decoders/fields/payee-party';
import { decodePaymentMeans, encodePaymentMeans } from '#/decoders/fields/payment-means';
import { decodePaymentTerms, encodePaymentTerms } from '#/decoders/fields/payment-terms';
import { decodeTaxRepresentativeParty, encodeTaxRepresentativeParty } from '#/decoders/fields/tax-representative-party';
import { decodeTaxTotals, encodeTaxTotals } from '#/decoders/fields/tax-totals';
import { getProp, strOrUnd } from '#/helpers';
import type { XmlNode } from '#/helpers';
import type { PeppolInvoice } from '#/schemas/invoice';
import type { RecursivePartial } from '#/types';

export function decodeInvoice(value: any): PeppolInvoice {
  const root = value || {};
  const doc: XmlNode = getProp(root, 'ubl:Invoice') ?? root;

  const invoice: RecursivePartial<PeppolInvoice> = {
    accountingCost: strOrUnd(doc, 'cbc:AccountingCost'),
    accountingCustomerParty: decodeParty(doc, 'cac:AccountingCustomerParty', 'cac:Party'),
    accountingSupplierParty: decodeParty(doc, 'cac:AccountingSupplierParty', 'cac:Party'),
    additionalDocumentReferences: decodeAdditionalDocumentReferences(doc),
    allowanceCharges: decodeAllowanceCharges(doc, 'cac:AllowanceCharge'),
    billingReferences: decodeBillingReferences(doc, 'cac:BillingReference'),
    buyerReference: strOrUnd(doc, 'cbc:BuyerReference'),
    contractDocumentReference: decodeSimpleIdentifer(doc, 'cac:ContractDocumentReference'),
    customizationId: strOrUnd(doc, 'cbc:CustomizationID'),
    delivery: decodeDelivery(doc, 'cac:Delivery'),
    despatchDocumentReference: decodeSimpleIdentifer(doc, 'cac:DespatchDocumentReference'),
    documentCurrencyCode: strOrUnd(doc, 'cbc:DocumentCurrencyCode'),
    dueDate: strOrUnd(doc, 'cbc:DueDate'),
    id: strOrUnd(doc, 'cbc:ID'),
    invoiceLines: decodeInvoiceLines(doc, 'cac:InvoiceLine'),
    invoicePeriod: decodeInvoicePeriod(doc, 'cac:InvoicePeriod'),
    invoiceTypeCode: strOrUnd(doc, 'cbc:InvoiceTypeCode'),
    issueDate: strOrUnd(doc, 'cbc:IssueDate'),
    legalMonetaryTotal: decodeLegalMonetaryTotal(doc, 'cac:LegalMonetaryTotal'),
    note: strOrUnd(doc, 'cbc:Note'),
    orderReference: decodeOrderReference(doc, 'cac:OrderReference'),
    originatorDocumentReference: decodeSimpleIdentifer(doc, 'cac:OriginatorDocumentReference'),
    payeeParty: decodePayeeParty(doc, 'cac:PayeeParty'),
    paymentMeans: decodePaymentMeans(doc, 'cac:PaymentMeans'),
    paymentTerms: decodePaymentTerms(doc, 'cac:PaymentTerms'),
    profileId: strOrUnd(doc, 'cbc:ProfileID'),
    projectReference: decodeSimpleIdentifer(doc, 'cac:ProjectReference'),
    receiptDocumentReference: decodeSimpleIdentifer(doc, 'cac:ReceiptDocumentReference'),
    taxCurrencyCode: strOrUnd(doc, 'cbc:TaxCurrencyCode'),
    taxPointDate: strOrUnd(doc, 'cbc:TaxPointDate'),
    taxRepresentativeParty: decodeTaxRepresentativeParty(doc, 'cac:TaxRepresentativeParty'),
    taxTotals: decodeTaxTotals(doc, 'cac:TaxTotal'),
  };

  return invoice as PeppolInvoice;
}

export function encodeInvoice(invoice: PeppolInvoice) {
  return {
    '?xml': { '@version': '1.0', '@encoding': 'UTF-8' },
    Invoice: {
      '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
      '@xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
      '@xmlns': 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
      'cbc:CustomizationID': invoice.customizationId,
      'cbc:ProfileID': invoice.profileId,
      'cbc:ID': invoice.id,
      'cbc:IssueDate': invoice.issueDate,
      'cbc:DueDate': invoice.dueDate,
      'cbc:InvoiceTypeCode': invoice.invoiceTypeCode,
      'cbc:Note': invoice.note,
      'cbc:TaxPointDate': invoice.taxPointDate,
      'cbc:DocumentCurrencyCode': invoice.documentCurrencyCode,
      'cbc:TaxCurrencyCode': invoice.taxCurrencyCode,
      'cbc:AccountingCost': invoice.accountingCost,
      'cbc:BuyerReference': invoice.buyerReference,
      'cac:InvoicePeriod': encodeInvoicePeriod(invoice.invoicePeriod),
      'cac:OrderReference': encodeOrderReference(invoice.orderReference),
      'cac:BillingReference': encodeBillingReferences(invoice.billingReferences),
      'cac:DespatchDocumentReference': encodeSimpleIdentifier(invoice.despatchDocumentReference),
      'cac:ReceiptDocumentReference': encodeSimpleIdentifier(invoice.receiptDocumentReference),
      'cac:OriginatorDocumentReference': encodeSimpleIdentifier(invoice.originatorDocumentReference),
      'cac:ContractDocumentReference': encodeSimpleIdentifier(invoice.contractDocumentReference),
      'cac:AdditionalDocumentReference': encodeAdditionalDocumentReferences(invoice.additionalDocumentReferences),
      'cac:ProjectReference': encodeSimpleIdentifier(invoice.projectReference),
      'cac:AccountingSupplierParty': encodeParty(invoice.accountingSupplierParty),
      'cac:AccountingCustomerParty': encodeParty(invoice.accountingCustomerParty),
      'cac:PayeeParty': encodePayeeParty(invoice.payeeParty),
      'cac:TaxRepresentativeParty': encodeTaxRepresentativeParty(invoice.taxRepresentativeParty),
      'cac:Delivery': encodeDelivery(invoice.delivery),
      'cac:PaymentMeans': encodePaymentMeans(invoice.paymentMeans),
      'cac:PaymentTerms': encodePaymentTerms(invoice.paymentTerms),
      'cac:AllowanceCharge': encodeAllowanceCharges(invoice.allowanceCharges),
      'cac:TaxTotal': encodeTaxTotals(invoice.taxTotals),
      'cac:LegalMonetaryTotal': encodeLegalMonetaryTotal(invoice.legalMonetaryTotal),
      'cac:InvoiceLine': encodeInvoiceLines(invoice.invoiceLines),
    },
  };
}
