import { Effect } from 'effect';

import type { PeppolInvoice } from '#/schemas/peppol-invoice-schema.ts';

import { encodeAdditionalDocumentReferences } from '#/decoders/fields/encode-additional-document-references.ts';
import { encodeAllowanceCharges } from '#/decoders/fields/encode-allowance-charges.ts';
import { encodeBillingReferences } from '#/decoders/fields/encode-billing-references.ts';
import { encodeDelivery } from '#/decoders/fields/encode-delivery.ts';
import { encodeInvoiceLines } from '#/decoders/fields/encode-invoice-lines.ts';
import { encodeInvoicePeriod } from '#/decoders/fields/encode-invoice-period.ts';
import { encodeLegalMonetaryTotal } from '#/decoders/fields/encode-legal-monetary-total.ts';
import { encodeOrderReference } from '#/decoders/fields/encode-order-reference.ts';
import { encodeParty } from '#/decoders/fields/encode-party.ts';
import { encodePayeeParty } from '#/decoders/fields/encode-payee-party.ts';
import { encodePaymentMeans } from '#/decoders/fields/encode-payment-means.ts';
import { encodePaymentTerms } from '#/decoders/fields/encode-payment-terms.ts';
import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier.ts';
import { encodeTaxRepresentativeParty } from '#/decoders/fields/encode-tax-representative-party.ts';
import { encodeTaxTotals } from '#/decoders/fields/encode-tax-totals.ts';

export const encodeInvoice = Effect.fn(function* (invoice: PeppolInvoice) {
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
      'cac:InvoicePeriod': yield* encodeInvoicePeriod(invoice.invoicePeriod),
      'cac:OrderReference': yield* encodeOrderReference(invoice.orderReference),
      'cac:BillingReference': yield* encodeBillingReferences(invoice.billingReferences),
      'cac:DespatchDocumentReference': yield* encodeSimpleIdentifier(invoice.despatchDocumentReference),
      'cac:ReceiptDocumentReference': yield* encodeSimpleIdentifier(invoice.receiptDocumentReference),
      'cac:OriginatorDocumentReference': yield* encodeSimpleIdentifier(invoice.originatorDocumentReference),
      'cac:ContractDocumentReference': yield* encodeSimpleIdentifier(invoice.contractDocumentReference),
      'cac:AdditionalDocumentReference': yield* encodeAdditionalDocumentReferences(invoice.additionalDocumentReferences),
      'cac:ProjectReference': yield* encodeSimpleIdentifier(invoice.projectReference),
      'cac:AccountingSupplierParty': yield* encodeParty(invoice.accountingSupplierParty),
      'cac:AccountingCustomerParty': yield* encodeParty(invoice.accountingCustomerParty),
      'cac:PayeeParty': yield* encodePayeeParty(invoice.payeeParty),
      'cac:TaxRepresentativeParty': yield* encodeTaxRepresentativeParty(invoice.taxRepresentativeParty),
      'cac:Delivery': yield* encodeDelivery(invoice.delivery),
      'cac:PaymentMeans': yield* encodePaymentMeans(invoice.paymentMeans),
      'cac:PaymentTerms': yield* encodePaymentTerms(invoice.paymentTerms),
      'cac:AllowanceCharge': yield* encodeAllowanceCharges(invoice.allowanceCharges),
      'cac:TaxTotal': yield* encodeTaxTotals(invoice.taxTotals),
      'cac:LegalMonetaryTotal': yield* encodeLegalMonetaryTotal(invoice.legalMonetaryTotal),
      'cac:InvoiceLine': yield* encodeInvoiceLines(invoice.invoiceLines),
    },
  };
});
