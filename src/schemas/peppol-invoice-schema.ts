import { Effect, Schema } from 'effect';

import { DEFAULT_CUSTOMIZATION_ID } from '#/schemas/fields/default-customization-id.ts';
import { DEFAULT_PROFILE_ID } from '#/schemas/fields/default-profile-id.ts';
import { PeppolAdditionalDocumentReference } from '#/schemas/fields/peppol-additional-document-reference-schema.ts';
import { PeppolAllowanceCharge } from '#/schemas/fields/peppol-allowance-charge-schema.ts';
import { PeppolBillingReference } from '#/schemas/fields/peppol-billing-reference-schema.ts';
import { PeppolDelivery } from '#/schemas/fields/peppol-delivery-schema.ts';
import { PeppolInvoiceLine } from '#/schemas/fields/peppol-invoice-line-schema.ts';
import { PeppolInvoicePeriod } from '#/schemas/fields/peppol-invoice-period-schema.ts';
import { PeppolLegalMonetaryTotal } from '#/schemas/fields/peppol-legal-monetary-total-schema.ts';
import { PeppolOrderReference } from '#/schemas/fields/peppol-order-reference-schema.ts';
import { PeppolPartySchema } from '#/schemas/fields/peppol-party-base-schema.ts';
import { PeppolPayeeParty } from '#/schemas/fields/peppol-payee-party-schema.ts';
import { PeppolPaymentMeans } from '#/schemas/fields/peppol-payment-means-schema.ts';
import { PeppolPaymentTerms } from '#/schemas/fields/peppol-payment-terms-schema.ts';
import { PeppolTaxRepresentative } from '#/schemas/fields/peppol-tax-representative-schema.ts';
import { PeppolTaxTotal } from '#/schemas/fields/peppol-tax-totals-base-schema.ts';
import { CAC_NAMESPACE, CBC_NAMESPACE, INVOICE_NAMESPACE } from '#/schemas/namespaces.ts';
import {
  PeppolContractDocumentReference,
  PeppolDespatchDocumentReference,
  PeppolOriginatorDocumentReference,
  PeppolReceiptDocumentReference,
} from '#/schemas/peppol-billing-base-schema.ts';
import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolCurrencyCode } from '#/schemas/values/currency-code-schema.ts';
import { PeppolInvoiceTypeCode } from '#/schemas/values/invoice-type-code-schema.ts';

/**
 * @description Wraps the `cac:ProjectReference` element on an invoice: an identifier of the project the invoice relates to.
 *
 * @example
 *   ```ts
 *   { id: 'project-123' }
 *   ```;
 *
 * @see {@link PeppolInvoice}
 */
export class PeppolProjectReference extends opaque<PeppolProjectReference>()(
  Schema.Struct({
    /**
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'ProjectReference' }), Schema.toStandardSchemaV1)
) {}

/**
 * @description UBL `Invoice` for PEPPOL BIS Billing 3.0. Extends {@link PeppolBillingBase} with the due date, type code, lines and project reference.
 *
 * @example
 *   ```ts
 *   {
 *     customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
 *     profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
 *     id: '33445566',
 *     issueDate: '2017-11-01',
 *     documentCurrencyCode: 'EUR',
 *     invoiceTypeCode: '380'
 *   }
 *   ```;
 *
 * @see {@link PeppolBillingBase}
 * @see {@link PeppolCreditNote}
 */
export class PeppolInvoice extends Schema.Opaque<PeppolInvoice>()(
  Schema.Struct({
    /**
     * @description An identification of the specification containing the total set of rules regarding semantic content, cardinalities, and business rules to which
     * the data contained in the intance document conforms.
     *
     * @default `urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0`
     *
     * @summary Specification identifier
     *
     * @cardinality 1..1
     *
     * @name `cbc:CustomizationID`
     */
    customizationId: Schema.String.check(
      Schema.isStartingWith('urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0', {
        message:
          "PEPPOL-EN16931-R004: Specification identifier MUST have the value 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0'.",
      })
    ).pipe(
      Schema.withDecodingDefaultType(Effect.succeed(DEFAULT_CUSTOMIZATION_ID)),
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'CustomizationID',
        description:
          'An identification of the specification containing the total set of rules regarding semantic content, cardinalities, and business rules to which the data contained in the intance document conforms.',
        title: 'Specification identifier',
      })
    ),
    /**
     * @description Identifies the business process context in which the transaction appears, to enable the Buyer to process the Invoice in an appropriate way.
     *
     * @default `urn:fdc:peppol.eu:2017:poacc:billing:01:1.0`
     *
     * @summary Business process type
     *
     * @name `cbc:ProfileID`
     */
    profileId: Schema.String.check(
      Schema.isPattern(/^urn:fdc:peppol.eu:2017:poacc:billing:(\d{2}):1\.0$/, {
        message:
          "PEPPOL-EN16931-R007: Business process MUST be in the format 'urn:fdc:peppol.eu:2017:poacc:billing:NN:1.0' where NN indicates the process number.",
      })
    ).pipe(
      Schema.withDecodingDefaultType(Effect.succeed(DEFAULT_PROFILE_ID)),
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ProfileID',
        description:
          'Identifies the business process context in which the transaction appears, to enable the Buyer to process the Invoice in an appropriate way.',
        title: 'Business process type',
      })
    ),
    /**
     * @description A using identification of the Invoice. The sequential number required in Article 226(2) of the directive 2006/112/EC [2], to uniquely identify
     * the Invoice within the business context, time-frame, operating systems and records of the Seller. No identification scheme is to be used.
     *
     * @example
     *   33445566;
     *
     * @summary Invoice number
     *
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ID',
        description:
          'A using identification of the Invoice. The sequential number required in Article 226(2) of the directive 2006/112/EC [2], to uniquely identify the Invoice within the business context, time-frame, operating systems and records of the Seller. No identification scheme is to be used.',
        title: 'Invoice number',
      })
    ),
    /**
     * @description The date when the invoice was issued.
     *
     * @example
     *   `2017-11-01`;
     *
     * @summary Invoice issue date
     *
     * @format `YYYY-MM-DD`
     *
     * @name `cbc:IssueDate`
     */
    issueDate: PeppolIsoDateString.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'IssueDate',
        description: 'The date when the invoice was issued.',
        examples: ['2017-11-01'] as unknown as ReadonlyArray<never>,
        title: 'Invoice issue date',
      })
    ),

    /**
     * @example
     *   `2017-11-01`;
     *
     * @summary Payment due date
     *
     * @name cbc:DueDate
     */
    dueDate: Schema.optional(PeppolIsoDateString).pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'DueDate', title: 'Payment due date' })
    ),

    /**
     * @example
     *   `380`;
     *
     * @summary Invoice type code
     *
     * @name cbc:InvoiceTypeCode
     */
    invoiceTypeCode: PeppolInvoiceTypeCode.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'InvoiceTypeCode',
        title: 'Invoice type code',
        examples: ['380`'] as unknown as ReadonlyArray<never>,
      })
    ),

    /**
     * @description Invoice note A textual note that gives unstructured information that is relevant to the Credit Note as a whole.
     *
     * @example
     *   Please note our new phone number 33 44 55 66
     *
     * @name `cbc:Note`
     */
    note: Schema.optional(Schema.String).pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'Note',
        description: 'Invoice note A textual note that gives unstructured information that is relevant to the Credit Note as a whole.',
        title: 'Invoice note',
      })
    ),
    /**
     * @description The date when the VAT becomes accountable for the Seller and for the Buyer in so far as that date can be determined and differs from the date
     * of issue of the invoice, according to the VAT directive.This element is required if the Value added tax point date is different from the
     * Invoice issue date.
     *
     * @example
     *   2017 - 11 - 01;
     *
     * @summary Value added tax point date
     *
     * @name `cbc:TaxPointDate`
     */
    taxPointDate: PeppolIsoDateString.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'TaxPointDate',
        description:
          'The date when the VAT becomes accountable for the Seller and for the Buyer in so far as that date can be determined and differs from the date of issue of the invoice, according to the VAT directive.This element is required if the Value added tax point date is different from the Invoice issue date.',
        title: 'Value added tax point date',
      }),
      Schema.optional
    ),
    /**
     * @description The currency in which all Invoice amounts are given, except for the Total VAT amount in accounting currency. Only one currency shall be used in
     * the Invoice, except for the VAT accounting currency code (BT-6) and the invoice total VAT amount in accounting currency (BT-111).
     *
     * @example
     *   EUR;
     *
     * @summary Invoice currency code
     *
     * @name `cbc:DocumentCurrencyCode`
     */
    documentCurrencyCode: PeppolCurrencyCode.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'DocumentCurrencyCode',
        description:
          'The currency in which all Invoice amounts are given, except for the Total VAT amount in accounting currency. Only one currency shall be used in the Invoice, except for the VAT accounting currency code (BT-6) and the invoice total VAT amount in accounting currency (BT-111).',
        examples: ['EUR'] as unknown as ReadonlyArray<never>,
        title: 'Invoice currency code',
      })
    ),

    /**
     * @description The currency used for VAT accounting and reporting purposes as accepted or required in the country of the Seller. Shall be used in combination
     * with the Invoice total VAT amount in accounting currency (BT-111), when the VAT accounting currency code differs from the Invoice currency
     * code.
     *
     * @example
     *   SEK;
     *
     * @summary VAT accounting currency code
     *
     * @name `cbc:TaxCurrencyCode`
     */
    taxCurrencyCode: PeppolCurrencyCode.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'TaxCurrencyCode',
        description:
          'The currency used for VAT accounting and reporting purposes as accepted or required in the country of the Seller. Shall be used in combination with the Invoice total VAT amount in accounting currency (BT-111), when the VAT accounting currency code differs from the Invoice currency code.',
        examples: ['SEK'] as unknown as ReadonlyArray<never>,
        title: 'VAT accounting currency code',
      }),
      Schema.optional
    ),
    /**
     * @description A textual value that specifies where to book the relevant data into the Buyer's financial accounts.
     *
     * @example
     *   `4217:2323:2323`;
     *
     * @summary Buyer accounting reference
     *
     * @name `cbc:AccountingCost`
     */
    accountingCost: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'AccountingCost',
        description: "A textual value that specifies where to book the relevant data into the Buyer's financial accounts.",
        examples: ['4217:2323:2323'] as unknown as ReadonlyArray<never>,
        title: 'Buyer accounting reference',
      }),
      Schema.optional
    ),
    /**
     * @description An identifier assigned by the Buyer used for internal routing purposes. An invoice must have buyer reference or purchase order reference
     * (BT-13).
     *
     * @example
     *   `abs1234`;
     *
     * @summary Buyer reference
     *
     * @name `cbc:BuyerReference`
     */
    buyerReference: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'BuyerReference',
        description:
          'An identifier assigned by the Buyer used for internal routing purposes. An invoice must have buyer reference or purchase order reference (BT-13).',
        examples: ['abs1234'] as unknown as ReadonlyArray<never>,
        title: 'Buyer reference',
      }),
      Schema.optional
    ),
    /**
     * @description A group of business terms providing information on the invoice period. Also called delivery period. If the group is used, the invoiceing period
     * start date and/or end date must be used.
     *
     * @summary DELIVERY OR INVOICE PERIOD
     *
     * @name `cac:InvoicePeriod`
     */
    invoicePeriod: PeppolInvoicePeriod.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'InvoicePeriod' }),
      Schema.optional
    ),
    /**
     * @summary ORDER AND SALES ORDER REFERENCE
     *
     * @name `cac:OrderReference`
     */
    orderReference: PeppolOrderReference.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'OrderReference' }),
      Schema.optional
    ),
    /**
     * @summary PRECEDING INVOICE REFERENCE (0..n)
     *
     * @name `cac:BillingReference`
     */
    billingReferences: Schema.Array(PeppolBillingReference).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'BillingReference' }),
      Schema.optional
    ),
    /**
     * @summary DESPATCH ADVICE REFERENCE
     *
     * @name `cac:DespatchDocumentReference`
     */
    despatchDocumentReference: Schema.optional(PeppolDespatchDocumentReference).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'DespatchDocumentReference' })
    ),
    /**
     * @summary RECEIPT ADVICE REFERENCE
     *
     * @name `cac:ReceiptDocumentReference`
     */
    receiptDocumentReference: Schema.optional(PeppolReceiptDocumentReference).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'ReceiptDocumentReference' })
    ),

    /**
     * @summary TENDER OR LOT REFERENCE
     *
     * @name `cac:OriginatorDocumentReference`
     */
    originatorDocumentReference: Schema.optional(PeppolOriginatorDocumentReference).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'OriginatorDocumentReference' })
    ),

    /**
     * @summary CONTRACT REFERENCE
     *
     * @name `cac:ContractDocumentReference`
     */
    contractDocumentReference: Schema.optional(PeppolContractDocumentReference).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'ContractDocumentReference' })
    ),

    /**
     * @description A group of business terms providing information about additional supporting documents substantiating the claims made in the Invoice. The
     * additional supporting documents can be used for both referencing a document number which is expected to be known by the receiver, an external
     * document (referenced by a URL) or as an embedded document, Base64 encoded (such as a time report).
     *
     * @summary ADDITIONAL SUPPORTING DOCUMENTS
     *
     * @name `cac:AdditionalDocumentReference`
     */
    additionalDocumentReferences: Schema.optional(Schema.Array(PeppolAdditionalDocumentReference)).pipe(
      Schema.annotate({
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'AdditionalDocumentReference',
        description:
          'A group of business terms providing information about additional supporting documents substantiating the claims made in the Invoice. The additional supporting documents can be used for both referencing a document number which is expected to be known by the receiver, an external document (referenced by a URL) or as an embedded document, Base64 encoded (such as a time report).',
      })
    ),

    /**
     * @summary PROJECT REFERENCE
     *
     * @name `cac:ProjectReference`
     */
    projectReference: Schema.optional(PeppolProjectReference).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'ProjectReference', title: 'PROJECT REFERENCE' })
    ),

    /**
     * @description A group of business terms providing information about the seller.
     *
     * @summary SELLER
     *
     * @name `cac:AccountingSupplierParty`
     */
    accountingSupplierParty: PeppolPartySchema.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'AccountingSupplierParty' })
    ),

    /**
     * @description A group of business terms providing information about the Buyer.
     *
     * @summary BUYER
     *
     * @name `cac:AccountingCustomerParty`
     */
    accountingCustomerParty: PeppolPartySchema.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'AccountingCustomerParty' })
    ),

    /**
     * @description A group of business terms providing information about the Payee, i.e. the role that received the payment. Shall be used wwhen the payee is
     * different from the seller.
     *
     * @summary PAYEE
     *
     * @name cac:PayeeParty
     */
    payeeParty: PeppolPayeeParty.pipe(
      Schema.annotate({
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'PayeeParty',
        description:
          'A group of business terms providing information about the Payee, i.e. the role that received the payment. Shall be used wwhen the payee is different from the seller.',
        title: 'PAYEE',
      }),
      Schema.optional
    ),

    /**
     * @description SELLER TAX REPRESENTATIVE PARTY.
     *
     * @name cac:TaxRepresentativeParty
     */
    taxRepresentativeParty: PeppolTaxRepresentative.pipe(Schema.optional),

    /**
     * @description DELIVERY INFORMATION.
     *
     * @name cac:Delivery
     */
    delivery: PeppolDelivery.pipe(Schema.optional),

    /**
     * @summary PAYMENT INSTRUCTIONS
     * @summary A group of business terms providing information about the payment.
     *
     * @name cac:PaymentMeans
     */
    paymentMeans: Schema.Array(PeppolPaymentMeans).pipe(
      Schema.annotate({
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'PaymentMeans',
        title: 'PAYMENT INSTRUCTIONS A group of business terms providing information about the payment.',
      }),
      Schema.optional
    ),

    /**
     * @example
     *   Net within 30 days
     *
     * @summary PAYMENT TERMS
     *
     * @name cac:PaymentTerms
     */
    paymentTerms: PeppolPaymentTerms.pipe(Schema.optional),

    /**
     * @description A group of business terms providing information about allowances applicable to the Invoice as a whole. A group of business terms providing
     * information about charges and taxes other than VAT, applicable to the Invoice as a whole.
     *
     * @summary DOCUMENT LEVEL ALLOWANCES AND CHARGES
     *
     * @name cac:AllowanceCharge
     */
    allowanceCharges: Schema.Array(PeppolAllowanceCharge).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'AllowanceCharge', message: 'unable to decode allowance charge' }),
      Schema.optional
    ),

    /**
     * @description When tax currency code is provided, two instances of the tax total must be present, but only one with tax subtotal.
     *
     * @summary TAX TOTAL
     *
     * @name cac:TaxTotal
     */
    taxTotals: Schema.Array(PeppolTaxTotal)
      .check(Schema.isMinLength(1), Schema.isMaxLength(2))
      .pipe(
        Schema.annotate({
          xmlNamespace: CAC_NAMESPACE,
          xmlPrefix: 'cac',
          xmlName: 'TaxTotal',
          description: 'When tax currency code is provided, two instances of the tax total must be present, but only one with tax subtotal.',
          title: 'TAX TOTAL',
        })
      ),

    /**
     * @summary DOCUMENT TOTALS
     *
     * @name cac:LegalMonetaryTotal
     */
    legalMonetaryTotal: PeppolLegalMonetaryTotal.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'LegalMonetaryTotal', title: 'DOCUMENT TOTALS' })
    ),

    /**
     * @summary INVOICE LINE
     *
     * @name cac:InvoiceLine
     */
    invoiceLines: Schema.Array(PeppolInvoiceLine)
      .check(Schema.isMinLength(1))
      .pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'InvoiceLine', title: 'INVOICE LINE' })),
  }).pipe(Schema.annotate({ xmlNamespace: INVOICE_NAMESPACE, xmlPrefix: 'ubl', xmlName: 'Invoice' }), Schema.toStandardSchemaV1)
) {}

/**
 * @description Type guard that returns `true` when a decoded value is a {@link PeppolInvoice}.
 *
 * @example
 *   ```ts
 *   isPeppolInvoice(doc); // true for a UBL Invoice
 *   ```;
 *
 * @see {@link PeppolDocumentSchema}
 */
export const isPeppolInvoice = Schema.is(PeppolInvoice);
