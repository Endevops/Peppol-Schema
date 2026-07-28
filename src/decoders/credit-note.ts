import { decodeAdditionalDocumentReferences, encodeAdditionalDocumentReferences } from '#/decoders/fields/additional-document-reference';
import { decodeAllowanceCharges, encodeAllowanceCharges } from '#/decoders/fields/allowance-charge';
import { decodeBillingReferences, encodeBillingReferences } from '#/decoders/fields/billing-references';
import { decodeDelivery, encodeDelivery } from '#/decoders/fields/delivery';
import { decodeCreditNoteLines, encodeCreditNoteLines } from '#/decoders/fields/document-line';
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
import type { PeppolCreditNote } from '#/schemas/credit-note';
import type { RecursivePartial } from '#/types';

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

export function encodeCreditNote(creditNote: PeppolCreditNote) {
  return {
    '?xml': { '@version': '1.0', '@encoding': 'UTF-8' },
    CreditNote: {
      '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@xsi:schemaLocation':
        import.meta.env.MODE === 'test'
          ? 'urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2 https://docs.oasis-open.org/ubl/os-UBL-2.4/xsd/maindoc/UBL-CreditNote-2.4.xsd urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2 https://docs.oasis-open.org/ubl/os-UBL-2.4/xsd/common/UBL-CommonAggregateComponents-2.4.xsd urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2 https://docs.oasis-open.org/ubl/os-UBL-2.4/xsd/common/UBL-CommonBasicComponents-2.4.xsd'
          : undefined,
      '@xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
      '@xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
      '@xmlns': 'urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2',
      'cbc:CustomizationID': creditNote.customizationId,
      'cbc:ProfileID': creditNote.profileId,
      'cbc:ID': creditNote.id,
      'cbc:IssueDate': creditNote.issueDate,
      'cbc:CreditNoteTypeCode': creditNote.creditNoteTypeCode,
      'cbc:Note': creditNote.note,
      'cbc:TaxPointDate': creditNote.taxPointDate,
      'cbc:DocumentCurrencyCode': creditNote.documentCurrencyCode,
      'cbc:TaxCurrencyCode': creditNote.taxCurrencyCode,
      'cbc:AccountingCost': creditNote.accountingCost,
      'cbc:BuyerReference': creditNote.buyerReference,
      'cac:InvoicePeriod': encodeInvoicePeriod(creditNote.invoicePeriod),
      'cac:OrderReference': encodeOrderReference(creditNote.orderReference),
      'cac:BillingReference': encodeBillingReferences(creditNote.billingReferences),
      'cac:DespatchDocumentReference': encodeSimpleIdentifier(creditNote.despatchDocumentReference),
      'cac:ReceiptDocumentReference': encodeSimpleIdentifier(creditNote.receiptDocumentReference),
      'cac:OriginatorDocumentReference': encodeSimpleIdentifier(creditNote.originatorDocumentReference),
      'cac:ContractDocumentReference': encodeSimpleIdentifier(creditNote.contractDocumentReference),
      'cac:AdditionalDocumentReference': encodeAdditionalDocumentReferences(creditNote.additionalDocumentReferences as any),
      'cac:AccountingSupplierParty': encodeParty(creditNote.accountingSupplierParty),
      'cac:AccountingCustomerParty': encodeParty(creditNote.accountingCustomerParty),
      'cac:PayeeParty': encodePayeeParty(creditNote.payeeParty),
      'cac:TaxRepresentativeParty': encodeTaxRepresentativeParty(creditNote.taxRepresentativeParty),
      'cac:Delivery': encodeDelivery(creditNote.delivery),
      'cac:PaymentMeans': encodePaymentMeans(creditNote.paymentMeans),
      'cac:PaymentTerms': encodePaymentTerms(creditNote.paymentTerms),
      'cac:AllowanceCharge': encodeAllowanceCharges(creditNote.allowanceCharges),
      'cac:TaxTotal': encodeTaxTotals(creditNote.taxTotals),
      'cac:LegalMonetaryTotal': encodeLegalMonetaryTotal(creditNote.legalMonetaryTotal),
      'cac:CreditNoteLine': encodeCreditNoteLines(creditNote.creditNoteLines),
    },
  };
}
