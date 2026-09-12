import { Effect } from 'effect';

import type { PeppolCreditNote } from '#/schemas/credit-note';

import { encodeAdditionalDocumentReferences } from '#/decoders/fields/encode-additional-document-references';
import { encodeAllowanceCharges } from '#/decoders/fields/encode-allowance-charges';
import { encodeBillingReferences } from '#/decoders/fields/encode-billing-references';
import { encodeCreditNoteLines } from '#/decoders/fields/encode-credit-note-lines';
import { encodeDelivery } from '#/decoders/fields/encode-delivery';
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

export const encodeCreditNote = Effect.fn(function* (creditNote: PeppolCreditNote) {
  return {
    '?xml': { '@version': '1.0', '@encoding': 'UTF-8' },
    CreditNote: {
      '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@xsi:schemaLocation':
        import.meta.env['MODE'] === 'test'
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
      'cac:InvoicePeriod': yield* encodeInvoicePeriod(creditNote.invoicePeriod),
      'cac:OrderReference': yield* encodeOrderReference(creditNote.orderReference),
      'cac:BillingReference': yield* encodeBillingReferences(creditNote.billingReferences),
      'cac:DespatchDocumentReference': yield* encodeSimpleIdentifier(creditNote.despatchDocumentReference),
      'cac:ReceiptDocumentReference': yield* encodeSimpleIdentifier(creditNote.receiptDocumentReference),
      'cac:OriginatorDocumentReference': yield* encodeSimpleIdentifier(creditNote.originatorDocumentReference),
      'cac:ContractDocumentReference': yield* encodeSimpleIdentifier(creditNote.contractDocumentReference),
      'cac:AdditionalDocumentReference': yield* encodeAdditionalDocumentReferences(creditNote.additionalDocumentReferences),
      'cac:AccountingSupplierParty': yield* encodeParty(creditNote.accountingSupplierParty),
      'cac:AccountingCustomerParty': yield* encodeParty(creditNote.accountingCustomerParty),
      'cac:PayeeParty': yield* encodePayeeParty(creditNote.payeeParty),
      'cac:TaxRepresentativeParty': yield* encodeTaxRepresentativeParty(creditNote.taxRepresentativeParty),
      'cac:Delivery': yield* encodeDelivery(creditNote.delivery),
      'cac:PaymentMeans': yield* encodePaymentMeans(creditNote.paymentMeans),
      'cac:PaymentTerms': yield* encodePaymentTerms(creditNote.paymentTerms),
      'cac:AllowanceCharge': yield* encodeAllowanceCharges(creditNote.allowanceCharges),
      'cac:TaxTotal': yield* encodeTaxTotals(creditNote.taxTotals),
      'cac:LegalMonetaryTotal': yield* encodeLegalMonetaryTotal(creditNote.legalMonetaryTotal),
      'cac:CreditNoteLine': yield* encodeCreditNoteLines(creditNote.creditNoteLines),
    },
  };
});
