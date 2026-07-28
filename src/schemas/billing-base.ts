import * as z from 'zod/mini';
import { additionalDocumentReferenceSchema } from '#/schemas/fields/additional-document-reference-schema';
import { allowanceChargeSchema } from '#/schemas/fields/allowance-charge-schema';
import { billingReferenceSchema } from '#/schemas/fields/billing-references-schema';
import { deliverySchema } from '#/schemas/fields/delivery-schema';
import { DEFAULT_CUSTOMIZATION_ID, DEFAULT_PROFILE_ID } from '#/schemas/fields/entities';
import { invoicePeriodSchema } from '#/schemas/fields/invoice-period';
import { legalMonetaryTotalSchema } from '#/schemas/fields/legal-monetary-total-schema';
import { orderReferenceSchema } from '#/schemas/fields/order-reference-schema';
import { partyBaseSchema } from '#/schemas/fields/party-base-schema';
import { payeePartySchema } from '#/schemas/fields/payee-party';
import { paymentMeansSchema } from '#/schemas/fields/payment-means-schema';
import { paymentTermsSchema } from '#/schemas/fields/payment-terms-schema';
import { taxRepresentativeSchema } from '#/schemas/fields/tax-representative-party-schema';
import { taxTotalsBaseSchema } from '#/schemas/fields/tax-totals';
import { currencyCodeSchema } from '#/schemas/values/currency-codes';

/**
 * @description Base schema for a billing document.
 *
 * @see {@link creditNoteSchema} - the credit note schema
 * @see {@link invoiceSchema} - the invoice schema
 */
export const billingBaseSchema = z.object({
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
  customizationId: z._default(
    z
      .string()
      .check(
        z.startsWith('urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0', {
          error:
            "PEPPOL-EN16931-R004: Specification identifier MUST have the value 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0'.",
        })
      ),
    DEFAULT_CUSTOMIZATION_ID
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
  profileId: z._default(
    z
      .string()
      .check(
        z.regex(
          /^urn:fdc:peppol.eu:2017:poacc:billing:(\d{2}):1\.0$/,
          "PEPPOL-EN16931-R007: Business process MUST be in the format 'urn:fdc:peppol.eu:2017:poacc:billing:NN:1.0' where NN indicates the process number."
        )
      ),
    DEFAULT_PROFILE_ID
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
  id: z.string(),
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
  issueDate: z.iso.date(),
  /**
   * @description Invoice note A textual note that gives unstructured information that is relevant to the Credit Note as a whole.
   *
   * @example
   *   Please note our new phone number 33 44 55 66
   *
   * @name `cbc:Note`
   */
  note: z.optional(z.string()),
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
  taxPointDate: z.optional(z.iso.date()),
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
  taxCurrencyCode: z.optional(currencyCodeSchema()),
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
  accountingCost: z.optional(z.string()),
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
  buyerReference: z.optional(z.string()),
  /**
   * @description A group of business terms providing information on the invoice period. Also called delivery period. If the group is used, the invoiceing period
   * start date and/or end date must be used.
   *
   * @summary DELIVERY OR INVOICE PERIOD
   *
   * @name `cac:InvoicePeriod`
   */
  invoicePeriod: z.optional(invoicePeriodSchema),
  /**
   * @summary ORDER AND SALES ORDER REFERENCE
   *
   * @name `cac:OrderReference`
   */
  orderReference: z.optional(orderReferenceSchema),
  /**
   * @summary PRECEDING INVOICE REFERENCE (0..n)
   *
   * @name `cac:BillingReference`
   */
  billingReferences: z.optional(z.array(billingReferenceSchema)),
  /**
   * @summary DESPATCH ADVICE REFERENCE
   *
   * @name `cac:DespatchDocumentReference`
   */
  despatchDocumentReference: z.optional(
    z.object({
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
      id: z.string(),
    })
  ),
  /**
   * @summary RECEIPT ADVICE REFERENCE
   *
   * @name `cac:ReceiptDocumentReference`
   */
  receiptDocumentReference: z.optional(
    z.object({
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
      id: z.string(),
    })
  ),
  /**
   * @summary TENDER OR LOT REFERENCE
   *
   * @name `cac:OriginatorDocumentReference`
   */
  originatorDocumentReference: z.optional(
    z.object({
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
      id: z.string(),
    })
  ),

  /**
   * @summary CONTRACT REFERENCE
   *
   * @name `cac:ContractDocumentReference`
   */
  contractDocumentReference: z.optional(
    z.object({
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
      id: z.string(),
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
  additionalDocumentReferences: z.optional(z.array(additionalDocumentReferenceSchema)),

  /**
   * @description A group of business terms providing information about the seller.
   *
   * @summary SELLER
   *
   * @name `cac:AccountingSupplierParty`
   */
  accountingSupplierParty: partyBaseSchema,

  /**
   * @description A group of business terms providing information about the Buyer.
   *
   * @summary BUYER
   *
   * @name `cac:AccountingCustomerParty`
   */
  accountingCustomerParty: partyBaseSchema,

  /**
   * @description A group of business terms providing information about the Payee, i.e. the role that received the payment. Shall be used wwhen the payee is
   * different from the seller.
   *
   * @summary PAYEE
   *
   * @name cac:PayeeParty
   */
  payeeParty: z.optional(payeePartySchema),

  /**
   * @description SELLER TAX REPRESENTATIVE PARTY.
   *
   * @name cac:TaxRepresentativeParty
   */
  taxRepresentativeParty: z.optional(taxRepresentativeSchema),

  /**
   * @description DELIVERY INFORMATION.
   *
   * @name cac:Delivery
   */
  delivery: z.optional(deliverySchema),

  /**
   * @summary PAYMENT INSTRUCTIONS
   * @summary A group of business terms providing information about the payment.
   *
   * @name cac:PaymentMeans
   */
  paymentMeans: z.optional(z.array(paymentMeansSchema)),

  /**
   * @example
   *   Net within 30 days
   *
   * @summary PAYMENT TERMS
   *
   * @name cac:PaymentTerms
   */
  paymentTerms: z.optional(paymentTermsSchema),

  /**
   * @description A group of business terms providing information about allowances applicable to the Invoice as a whole. A group of business terms providing
   * information about charges and taxes other than VAT, applicable to the Invoice as a whole.
   *
   * @summary DOCUMENT LEVEL ALLOWANCES AND CHARGES
   *
   * @name cac:AllowanceCharge
   */
  allowanceCharges: z.optional(z.array(allowanceChargeSchema)),

  /**
   * @description When tax currency code is provided, two instances of the tax total must be present, but only one with tax subtotal.
   *
   * @summary TAX TOTAL
   *
   * @name cac:TaxTotal
   */
  taxTotals: z.array(taxTotalsBaseSchema).check(z.minLength(1), z.maxLength(2)),

  /**
   * @summary DOCUMENT TOTALS
   *
   * @name cac:LegalMonetaryTotal
   */
  legalMonetaryTotal: legalMonetaryTotalSchema,
});
