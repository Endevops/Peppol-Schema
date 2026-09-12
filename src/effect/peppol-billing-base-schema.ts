import { Effect, Schema } from 'effect';

import { DEFAULT_CUSTOMIZATION_ID } from '#/effect/fields/default-customization-id';
import { DEFAULT_PROFILE_ID } from '#/effect/fields/default-profile-id';
import { peppolAdditionalDocumentReferenceSchema } from '#/effect/fields/peppol-additional-document-reference-schema';
import { peppolAllowanceChargeSchema } from '#/effect/fields/peppol-allowance-charge-schema';
import { peppolBillingReferenceSchema } from '#/effect/fields/peppol-billing-reference-schema';
import { peppolDeliverySchema } from '#/effect/fields/peppol-delivery-schema';
import { peppolInvoicePeriodSchema } from '#/effect/fields/peppol-invoice-period-schema';
import { peppolLegalMonetaryTotalSchema } from '#/effect/fields/peppol-legal-monetary-total-schema';
import { peppolOrderReferenceSchema } from '#/effect/fields/peppol-order-reference-schema';
import { peppolPartyBaseSchema } from '#/effect/fields/peppol-party-base-schema';
import { peppolPayeePartySchema } from '#/effect/fields/peppol-payee-party-schema';
import { peppolPaymentMeansSchema } from '#/effect/fields/peppol-payment-means-schema';
import { peppolPaymentTermsSchema } from '#/effect/fields/peppol-payment-terms-schema';
import { peppolTaxRepresentativeSchema } from '#/effect/fields/peppol-tax-representative-schema';
import { peppolTaxTotalsBaseSchema } from '#/effect/fields/peppol-tax-totals-base-schema';
import { peppolIsoDateStringSchema } from '#/effect/peppol-iso-date-string-schema';
import { currencyCodeSchema } from '#/effect/values/currency-code-schema';

/**
 * @description Base schema for a billing document.
 *
 * @see {@link creditNoteSchema} - the credit note schema
 * @see {@link invoiceSchema} - the invoice schema
 */
export const peppolBillingBaseSchema = Schema.Struct({
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
  customizationId: Schema.String.pipe(Schema.withDecodingDefaultType(Effect.succeed(DEFAULT_CUSTOMIZATION_ID))).check(
    Schema.isStartsWith('urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0', {
      message:
        "PEPPOL-EN16931-R004: Specification identifier MUST have the value 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0'.",
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
  profileId: Schema.String.pipe(Schema.withDecodingDefaultType(Effect.succeed(DEFAULT_PROFILE_ID))).check(
    Schema.isPattern(/^urn:fdc:peppol.eu:2017:poacc:billing:(\d{2}):1\.0$/, {
      message:
        "PEPPOL-EN16931-R007: Business process MUST be in the format 'urn:fdc:peppol.eu:2017:poacc:billing:NN:1.0' where NN indicates the process number.",
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
  id: Schema.String,
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
  issueDate: peppolIsoDateStringSchema,
  /**
   * @description Invoice note A textual note that gives unstructured information that is relevant to the Credit Note as a whole.
   *
   * @example
   *   Please note our new phone number 33 44 55 66
   *
   * @name `cbc:Note`
   */
  note: Schema.optional(Schema.String),
  /**
   * @description The date when the VAT becomes accountable for the Seller and for the Buyer in so far as that date can be determined and differs from the date of
   * issue of the invoice, according to the VAT directive.This element is required if the Value added tax point date is different from the Invoice
   * issue date.
   *
   * @example
   *   2017 - 11 - 01;
   *
   * @summary Value added tax point date
   *
   * @name `cbc:TaxPointDate`
   */
  taxPointDate: Schema.optional(peppolIsoDateStringSchema),
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
  documentCurrencyCode: currencyCodeSchema(),
  /**
   * @description The currency used for VAT accounting and reporting purposes as accepted or required in the country of the Seller. Shall be used in combination
   * with the Invoice total VAT amount in accounting currency (BT-111), when the VAT accounting currency code differs from the Invoice currency code.
   *
   * @example
   *   SEK;
   *
   * @summary VAT accounting currency code
   *
   * @name `cbc:TaxCurrencyCode`
   */
  taxCurrencyCode: Schema.optional(currencyCodeSchema()),
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
  accountingCost: Schema.optional(Schema.String),
  /**
   * @description An identifier assigned by the Buyer used for internal routing purposes. An invoice must have buyer reference or purchase order reference (BT-13).
   *
   * @example
   *   `abs1234`;
   *
   * @summary Buyer reference
   *
   * @name `cbc:BuyerReference`
   */
  buyerReference: Schema.optional(Schema.String),
  /**
   * @description A group of business terms providing information on the invoice period. Also called delivery period. If the group is used, the invoiceing period
   * start date and/or end date must be used.
   *
   * @summary DELIVERY OR INVOICE PERIOD
   *
   * @name `cac:InvoicePeriod`
   */
  invoicePeriod: Schema.optional(peppolInvoicePeriodSchema),
  /**
   * @summary ORDER AND SALES ORDER REFERENCE
   *
   * @name `cac:OrderReference`
   */
  orderReference: Schema.optional(peppolOrderReferenceSchema),
  /**
   * @summary PRECEDING INVOICE REFERENCE (0..n)
   *
   * @name `cac:BillingReference`
   */
  billingReferences: Schema.optional(Schema.Array(peppolBillingReferenceSchema)),
  /**
   * @summary DESPATCH ADVICE REFERENCE
   *
   * @name `cac:DespatchDocumentReference`
   */
  despatchDocumentReference: Schema.optional(
    Schema.Struct({
      /**
       * @description An identifier of a referenced despatch advice.
       *
       * @example
       *   `desp98`;
       *
       * @summary Despatch advice reference
       *
       * @name `cbc:ID`
       */
      id: Schema.String,
    })
  ),
  /**
   * @summary RECEIPT ADVICE REFERENCE
   *
   * @name `cac:ReceiptDocumentReference`
   */
  receiptDocumentReference: Schema.optional(
    Schema.Struct({
      /**
       * @description An identifier of a referenced receiving advice.
       *
       * @example
       *   `rec98`;
       *
       * @summary Receiving advice reference
       *
       * @name `cbc:ID`
       */
      id: Schema.String,
    })
  ),
  /**
   * @summary TENDER OR LOT REFERENCE
   *
   * @name `cac:OriginatorDocumentReference`
   */
  originatorDocumentReference: Schema.optional(
    Schema.Struct({
      /**
       * @description The identification of the call for tender or lot the invoice relates to.
       *
       * @example
       *   `PPID-123`;
       *
       * @summary Tender or lot reference
       *
       * @name `cbc:ID`
       */
      id: Schema.String,
    })
  ),

  /**
   * @summary CONTRACT REFERENCE
   *
   * @name `cac:ContractDocumentReference`
   */
  contractDocumentReference: Schema.optional(
    Schema.Struct({
      /**
       * @description An identifier of a referenced contract.
       *
       * @example
       *   `123Contractref`;
       *
       * @summary Contract reference
       *
       * @name `cbc:ID`
       */
      id: Schema.String,
    })
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
  additionalDocumentReferences: Schema.optional(Schema.Array(peppolAdditionalDocumentReferenceSchema)),

  /**
   * @description A group of business terms providing information about the seller.
   *
   * @summary SELLER
   *
   * @name `cac:AccountingSupplierParty`
   */
  accountingSupplierParty: peppolPartyBaseSchema,

  /**
   * @description A group of business terms providing information about the Buyer.
   *
   * @summary BUYER
   *
   * @name `cac:AccountingCustomerParty`
   */
  accountingCustomerParty: peppolPartyBaseSchema,

  /**
   * @description A group of business terms providing information about the Payee, i.e. the role that received the payment. Shall be used wwhen the payee is
   * different from the seller.
   *
   * @summary PAYEE
   *
   * @name cac:PayeeParty
   */
  payeeParty: Schema.optional(peppolPayeePartySchema),

  /**
   * @description SELLER TAX REPRESENTATIVE PARTY.
   *
   * @name cac:TaxRepresentativeParty
   */
  taxRepresentativeParty: Schema.optional(peppolTaxRepresentativeSchema),

  /**
   * @description DELIVERY INFORMATION.
   *
   * @name cac:Delivery
   */
  delivery: Schema.optional(peppolDeliverySchema),

  /**
   * @summary PAYMENT INSTRUCTIONS
   * @summary A group of business terms providing information about the payment.
   *
   * @name cac:PaymentMeans
   */
  paymentMeans: Schema.optional(Schema.Array(peppolPaymentMeansSchema)),

  /**
   * @example
   *   Net within 30 days
   *
   * @summary PAYMENT TERMS
   *
   * @name cac:PaymentTerms
   */
  paymentTerms: Schema.optional(peppolPaymentTermsSchema),

  /**
   * @description A group of business terms providing information about allowances applicable to the Invoice as a whole. A group of business terms providing
   * information about charges and taxes other than VAT, applicable to the Invoice as a whole.
   *
   * @summary DOCUMENT LEVEL ALLOWANCES AND CHARGES
   *
   * @name cac:AllowanceCharge
   */
  allowanceCharges: Schema.optional(Schema.Array(peppolAllowanceChargeSchema)),

  /**
   * @description When tax currency code is provided, two instances of the tax total must be present, but only one with tax subtotal.
   *
   * @summary TAX TOTAL
   *
   * @name cac:TaxTotal
   */
  taxTotals: Schema.Array(peppolTaxTotalsBaseSchema).check(Schema.isMinLength(1), Schema.isMaxLength(2)),

  /**
   * @summary DOCUMENT TOTALS
   *
   * @name cac:LegalMonetaryTotal
   */
  legalMonetaryTotal: peppolLegalMonetaryTotalSchema,
});

export type PeppolBillingBase = typeof peppolBillingBaseSchema.Type;
