import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { decodeAdditionalDocumentReferences } from '#/decoders/fields/decode-additional-document-references';
import { decodeAllowanceCharges } from '#/decoders/fields/decode-allowance-charges';
import { decodeBillingReferences } from '#/decoders/fields/decode-billing-references';
import { decodeDelivery } from '#/decoders/fields/decode-delivery';
import { decodeInvoicePeriod } from '#/decoders/fields/decode-invoice-period';
import { decodeLegalMonetaryTotal } from '#/decoders/fields/decode-legal-monetary-total';
import { decodeOrderReference } from '#/decoders/fields/decode-order-reference';
import { decodeParty } from '#/decoders/fields/decode-party';
import { decodePayeeParty } from '#/decoders/fields/decode-payee-party';
import { decodePaymentMeans } from '#/decoders/fields/decode-payment-means';
import { decodePaymentTerms } from '#/decoders/fields/decode-payment-terms';
import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { decodeTaxRepresentativeParty } from '#/decoders/fields/decode-tax-representative-party';
import { decodeTaxTotals } from '#/decoders/fields/decode-tax-totals';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeBilling = Effect.fn(function* (doc: XmlNode) {
  return {
    accountingCost: yield* strOrUnd(doc, 'cbc:AccountingCost'),
    accountingCustomerParty: yield* decodeParty(doc, 'cac:AccountingCustomerParty', 'cac:Party'),
    accountingSupplierParty: yield* decodeParty(doc, 'cac:AccountingSupplierParty', 'cac:Party'),
    additionalDocumentReferences: yield* decodeAdditionalDocumentReferences(doc),
    allowanceCharges: yield* decodeAllowanceCharges(doc, 'cac:AllowanceCharge'),
    billingReferences: yield* decodeBillingReferences(doc, 'cac:BillingReference'),
    buyerReference: yield* strOrUnd(doc, 'cbc:BuyerReference'),
    contractDocumentReference: yield* decodeSimpleIdentifer(doc, 'cac:ContractDocumentReference'),
    customizationId: yield* strOrUnd(doc, 'cbc:CustomizationID'),
    delivery: yield* decodeDelivery(doc, 'cac:Delivery'),
    despatchDocumentReference: yield* decodeSimpleIdentifer(doc, 'cac:DespatchDocumentReference'),
    documentCurrencyCode: yield* strOrUnd(doc, 'cbc:DocumentCurrencyCode'),
    id: yield* strOrUnd(doc, 'cbc:ID'),
    invoicePeriod: yield* decodeInvoicePeriod(doc, 'cac:InvoicePeriod'),
    issueDate: yield* strOrUnd(doc, 'cbc:IssueDate'),
    legalMonetaryTotal: yield* decodeLegalMonetaryTotal(doc, 'cac:LegalMonetaryTotal'),
    note: yield* strOrUnd(doc, 'cbc:Note'),
    orderReference: yield* decodeOrderReference(doc, 'cac:OrderReference'),
    originatorDocumentReference: yield* decodeSimpleIdentifer(doc, 'cac:OriginatorDocumentReference'),
    payeeParty: yield* decodePayeeParty(doc, 'cac:PayeeParty'),
    paymentMeans: yield* decodePaymentMeans(doc, 'cac:PaymentMeans'),
    paymentTerms: yield* decodePaymentTerms(doc, 'cac:PaymentTerms'),
    profileId: yield* strOrUnd(doc, 'cbc:ProfileID'),
    receiptDocumentReference: yield* decodeSimpleIdentifer(doc, 'cac:ReceiptDocumentReference'),
    taxCurrencyCode: yield* strOrUnd(doc, 'cbc:TaxCurrencyCode'),
    taxPointDate: yield* strOrUnd(doc, 'cbc:TaxPointDate'),
    taxRepresentativeParty: yield* decodeTaxRepresentativeParty(doc, 'cac:TaxRepresentativeParty'),
    taxTotals: yield* decodeTaxTotals(doc, 'cac:TaxTotal'),
  };
});
