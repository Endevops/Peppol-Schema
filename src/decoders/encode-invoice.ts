import type { PeppolInvoice } from '#/schemas/invoice';

import { encodeAdditionalDocumentReferences } from '#/decoders/fields/encode-additional-document-references';
import { encodeAllowanceCharges } from '#/decoders/fields/encode-allowance-charges';
import { encodeBillingReferences } from '#/decoders/fields/encode-billing-references';
import { encodeDelivery } from '#/decoders/fields/encode-delivery';
import { encodeInvoiceLines } from '#/decoders/fields/encode-invoice-lines';
import { encodeInvoicePeriod } from '#/decoders/fields/encode-invoice-period';
import { encodeLegalMonetaryTotal } from '#/decoders/fields/encode-legal-monetary-total';
import { encodeOrderReference } from '#/decoders/fields/encode-order-reference';
import { encodeParty } from '#/decoders/fields/encode-party';
import { encodePayeeParty } from '#/decoders/fields/encode-payee-party';
import { encodePaymentMeans } from '#/decoders/fields/encode-payment-means';
import { encodePaymentTerms } from '#/decoders/fields/encode-payment-terms';
import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier';
import { encodeTaxRepresentativeParty } from '#/decoders/fields/encode-tax-representative-party';
import { encodeTaxTotals } from '#/decoders/fields/encode-tax-totals';

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
