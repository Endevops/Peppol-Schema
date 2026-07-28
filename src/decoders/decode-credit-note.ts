import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolCreditNote } from '#/schemas/credit-note';
import type { RecursivePartial } from '#/types';

import { decodeAdditionalDocumentReferences } from '#/decoders/fields/decode-additional-document-references';
import { decodeAllowanceCharges } from '#/decoders/fields/decode-allowance-charges';
import { decodeBillingReferences } from '#/decoders/fields/decode-billing-references';
import { decodeDelivery } from '#/decoders/fields/decode-delivery';
import { decodeCreditNoteLines } from '#/decoders/fields/decode-credit-note-lines';
import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { decodeInvoicePeriod } from '#/decoders/fields/decode-invoice-period';
import { decodeLegalMonetaryTotal } from '#/decoders/fields/decode-legal-monetary-total';
import { decodeOrderReference } from '#/decoders/fields/decode-order-reference';
import { decodeParty } from '#/decoders/fields/decode-party';
import { decodePayeeParty } from '#/decoders/fields/decode-payee-party';
import { decodePaymentMeans } from '#/decoders/fields/decode-payment-means';
import { decodePaymentTerms } from '#/decoders/fields/decode-payment-terms';
import { decodeTaxRepresentativeParty } from '#/decoders/fields/decode-tax-representative-party';
import { decodeTaxTotals } from '#/decoders/fields/decode-tax-totals';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeCreditNote(value: XmlNode): PeppolCreditNote {
  const root = value || {};
  const doc: XmlNode = getProp(root, 'ubl:CreditNote') ?? root; // accept either the whole JSON or just the CreditNote node

  const result: RecursivePartial<PeppolCreditNote> = {
    accountingCost: strOrUnd(doc, 'cbc:AccountingCost'),
    accountingCustomerParty: decodeParty(doc, 'cac:AccountingCustomerParty', 'cac:Party')!,
    accountingSupplierParty: decodeParty(doc, 'cac:AccountingSupplierParty', 'cac:Party')!,
    additionalDocumentReferences: decodeAdditionalDocumentReferences(doc),
    allowanceCharges: decodeAllowanceCharges(doc, 'cac:AllowanceCharge'),
    billingReferences: decodeBillingReferences(doc, 'cac:BillingReference'),
    buyerReference: strOrUnd(doc, 'cbc:BuyerReference'),
    contractDocumentReference: decodeSimpleIdentifer(doc, 'cac:ContractDocumentReference'),
    creditNoteLines: decodeCreditNoteLines(doc, 'cac:CreditNoteLine'),
    creditNoteTypeCode: strOrUnd(doc, 'cbc:CreditNoteTypeCode'),
    customizationId: strOrUnd(doc, 'cbc:CustomizationID'),
    delivery: decodeDelivery(doc, 'cac:Delivery'),
    despatchDocumentReference: decodeSimpleIdentifer(doc, 'cac:DespatchDocumentReference'),
    documentCurrencyCode: strOrUnd(doc, 'cbc:DocumentCurrencyCode'),
    id: strOrUnd(doc, 'cbc:ID'),
    invoicePeriod: decodeInvoicePeriod(doc, 'cac:InvoicePeriod'),
    issueDate: strOrUnd(doc, 'cbc:IssueDate'),
    legalMonetaryTotal: decodeLegalMonetaryTotal(doc, 'cac:LegalMonetaryTotal'),
    note: strOrUnd(doc, 'cbc:Note'),
    orderReference: decodeOrderReference(doc, 'cac:OrderReference'),
    originatorDocumentReference: decodeSimpleIdentifer(doc, 'cac:OriginatorDocumentReference'),
    payeeParty: decodePayeeParty(doc, 'cac:PayeeParty'),
    paymentMeans: decodePaymentMeans(doc, 'cac:PaymentMeans'),
    paymentTerms: decodePaymentTerms(doc, 'cac:PaymentTerms'),
    profileId: strOrUnd(doc, 'cbc:ProfileID'),
    receiptDocumentReference: decodeSimpleIdentifer(doc, 'cac:ReceiptDocumentReference'),
    taxCurrencyCode: strOrUnd(doc, 'cbc:TaxCurrencyCode'),
    taxPointDate: strOrUnd(doc, 'cbc:TaxPointDate'),
    taxRepresentativeParty: decodeTaxRepresentativeParty(doc, 'cac:TaxRepresentativeParty'),
    taxTotals: decodeTaxTotals(doc, 'cac:TaxTotal'),
  };

  return result as PeppolCreditNote;
}
