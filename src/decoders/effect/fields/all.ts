import { Schema } from 'effect'

import { currencyCodesKeys } from '#/values/currency-code.generated'
import { countryCodesKeys } from '#/values/country-code.generated'
import { electronicAddressCodesKeys } from '#/values/eas-codes.generated'
import { icdCodesKeys } from '#/values/icd-codes.generated'
import { invoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated'
import { creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated'
import { applicationResponseTypeCodesKeys } from '#/values/application-response-type-codes.generated'
import { documentTypeCodesKeys } from '#/values/document-type-codes.generated'
import { paymentMeansCodesKeys } from '#/values/payment-means-codes.generated'
import { quantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated'
import { dutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated'
import { allowanceChargeReasonCodesKeys } from '#/values/allowance-charge-reason-codes.generated'
import { chargeReasonCodesKeys } from '#/values/charge-reason-codes.generated'
import { mimeCodesKeys } from '#/values/mime-codes.generated'
import { additionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated'
import { vatDateCodesKeys } from '#/values/vat-dates.generated'
import { itemClassificationCodesKeys } from '#/values/item-classification-code.generated'
import { opStatusActionKeys } from '#/values/op-status-action.generated'
import { opStatusReasonKeys } from '#/values/op-status-reason.generated'
import { invoiceResponseCodeNeedsSchema } from '#/invoice-response-codes/invoice-response-code-needs-schema'
import { invoiceResponseCodeNotNeedsSchema } from '#/invoice-response-codes/invoice-response-code-not-needs-schema'

import { DEFAULT_CUSTOMIZATION_ID } from '#/schemas/fields/default-customization-id'
import { DEFAULT_PROFILE_ID } from '#/schemas/fields/default-profile-id'

// ─── Helpers ────────────────────────────────────────────────────────────────

const isISODate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s)

const codeFromList = (keys: readonly string[], errorMsg?: string) =>
  Schema.String.check(Schema.filter((s: string) => keys.includes(s), { message: () => errorMsg ?? 'Invalid code' }))

// ─── Value Code Schemas ─────────────────────────────────────────────────────

export const CurrencyCode = codeFromList(currencyCodesKeys)
export const CountryCode = Schema.String.check(
  Schema.filter((s: string) => s.length === 2 && countryCodesKeys.includes(s), { message: () => 'Invalid country code' })
)
export const ElectronicCode = codeFromList(electronicAddressCodesKeys)
export const IcdCode = codeFromList(icdCodesKeys, 'Invalid ICD code provided')
export const InvoiceTypeCode = codeFromList(invoiceTypeCodesKeys)
export const CreditNoteTypeCode = codeFromList(creditNoteTypeCodesKeys)
export const ApplicationResponseTypeCode = codeFromList(applicationResponseTypeCodesKeys)
export const DocumentTypeCode = codeFromList(documentTypeCodesKeys)
export const PaymentMeansCode = codeFromList(paymentMeansCodesKeys)
export const QuantityUnitCode = codeFromList(quantityUnitCodesKeys)
export const DutyTaxFeeCategoryCode = codeFromList(dutyTaxFeeCategoriesKeys)
export const AllowanceChargeReasonCode = codeFromList(allowanceChargeReasonCodesKeys)
export const ChargeReasonCode = codeFromList(chargeReasonCodesKeys)
export const MimeCode = codeFromList(mimeCodesKeys)
export const AdditionalDocumentReferenceCode = codeFromList(additionalDocumentReferenceCodesKeys)
export const VatDateCode = codeFromList(vatDateCodesKeys)
export const ItemClassificationCode = codeFromList(itemClassificationCodesKeys)
export const OpStatusActionCode = codeFromList(opStatusActionKeys)
export const OpStatusReasonCode = codeFromList(opStatusReasonKeys)

// ─── ISO Date ───────────────────────────────────────────────────────────────

export const ISODate = Schema.String.check(
  Schema.filter((s: string) => isISODate(s), { message: () => 'Invalid ISO date, expected YYYY-MM-DD' })
)

// ─── XSD Time ───────────────────────────────────────────────────────────────

const XSD_TIME_RE =
  /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|-0[1-9]|-1\d|-2[0-3]|-00:?(?:0[1-9]|[1-5]\d)|\+[01]\d|\+2[0-3])?(?:|:?[0-5]\d)$/

export const XsdTime = Schema.String.check(
  Schema.filter((s: string) => XSD_TIME_RE.test(s), { message: () => 'Invalid ISO time' })
)

// ─── Basic Field Schemas ────────────────────────────────────────────────────

export const Amount = Schema.Struct({
  currencyId: CurrencyCode,
  value: Schema.Number,
})
export interface Amount extends Schema.Schema.Type<typeof Amount> {}

export const Identifier = Schema.Struct({
  id: Schema.String,
  schemeId: Schema.optionalKey(Schema.String),
})
export interface Identifier extends Schema.Schema.Type<typeof Identifier> {}

export const Quantity = Schema.Struct({
  unitCode: Schema.optionalKey(QuantityUnitCode),
  value: Schema.Number,
})
export interface Quantity extends Schema.Schema.Type<typeof Quantity> {}

export const Contact = Schema.Struct({
  electronicMail: Schema.optionalKey(Schema.String),
  name: Schema.optionalKey(Schema.String),
  telephone: Schema.optionalKey(Schema.String),
})
export interface Contact extends Schema.Schema.Type<typeof Contact> {}

// ─── Address ────────────────────────────────────────────────────────────────

export const Address = Schema.Struct({
  streetName: Schema.optionalKey(Schema.String),
  additionalStreetName: Schema.optionalKey(Schema.String),
  cityName: Schema.optionalKey(Schema.String),
  postalZone: Schema.optionalKey(Schema.String),
  countrySubentity: Schema.optionalKey(Schema.String),
  countryCode: Schema.Struct({
    identificationCode: CountryCode,
  }),
  addressLine: Schema.optionalKey(
    Schema.Struct({
      line: Schema.String,
    })
  ),
})
export interface Address extends Schema.Schema.Type<typeof Address> {}

// ─── Party Schemas ──────────────────────────────────────────────────────────

export const PartyTaxScheme = Schema.Struct({
  companyId: Schema.String,
  taxSchemeId: Schema.Struct({
    id: Schema.String.pipe(Schema.withDefault('VAT')),
  }),
})
export interface PartyTaxScheme extends Schema.Schema.Type<typeof PartyTaxScheme> {}

export const PartyLegalEntity = Schema.Struct({
  companyId: Schema.optionalKey(Identifier),
  companyLegalForm: Schema.optionalKey(Schema.String),
  registrationName: Schema.String,
})
export interface PartyLegalEntity extends Schema.Schema.Type<typeof PartyLegalEntity> {}

export const PartyBase = Schema.Struct({
  endpointId: Schema.Struct({
    id: Schema.String,
    schemeId: ElectronicCode,
  }),
  partyIdentification: Schema.optionalKey(
    Schema.Struct({
      id: Schema.Struct({
        id: Schema.String,
        schemeId: Schema.optionalKey(IcdCode),
      }),
    })
  ),
  partyName: Schema.optionalKey(
    Schema.Struct({
      name: Schema.String,
    })
  ),
  postalAddress: Address,
  partyTaxSchemes: Schema.optionalKey(Schema.Array(PartyTaxScheme)),
  partyLegalEntity: PartyLegalEntity,
  contact: Schema.optionalKey(Contact),
})
export interface PartyBase extends Schema.Schema.Type<typeof PartyBase> {}

export const PayeeParty = Schema.Struct({
  partyIdentification: Schema.optionalKey(
    Schema.Struct({
      id: Schema.optionalKey(
        Schema.Struct({
          id: Schema.String,
          schemeId: Schema.optionalKey(Schema.String),
        })
      ),
    })
  ),
  partyLegalEntity: Schema.optionalKey(
    Schema.Struct({
      companyId: Schema.optionalKey(
        Schema.Struct({
          id: Schema.String,
          schemeId: Schema.optionalKey(IcdCode),
        })
      ),
    })
  ),
  partyName: Schema.Struct({ name: Schema.String }),
})
export interface PayeeParty extends Schema.Schema.Type<typeof PayeeParty> {}

export const TaxRepresentative = Schema.Struct({
  name: Schema.String,
  postalAddress: Address,
  partyTaxScheme: PartyTaxScheme,
})
export interface TaxRepresentative extends Schema.Schema.Type<typeof TaxRepresentative> {}

// ─── Period Schemas ─────────────────────────────────────────────────────────

export const InvoiceLinePeriod = Schema.Struct({
  endDate: Schema.optionalKey(ISODate),
  startDate: Schema.optionalKey(ISODate),
})
export interface InvoiceLinePeriod extends Schema.Schema.Type<typeof InvoiceLinePeriod> {}

export const InvoicePeriod = Schema.Struct({
  ...InvoiceLinePeriod.fields,
  descriptionCode: Schema.optionalKey(VatDateCode),
})
export interface InvoicePeriod extends Schema.Schema.Type<typeof InvoicePeriod> {}

// ─── Reference Schemas ──────────────────────────────────────────────────────

export const OrderReference = Schema.Struct({
  id: Schema.String,
  salesOrderId: Schema.optionalKey(Schema.String),
})
export interface OrderReference extends Schema.Schema.Type<typeof OrderReference> {}

export const BillingReference = Schema.Struct({
  invoiceDocumentReference: Schema.Struct({
    id: Schema.String,
    issueDate: Schema.optionalKey(ISODate),
  }),
})
export interface BillingReference extends Schema.Schema.Type<typeof BillingReference> {}

// ─── Delivery ───────────────────────────────────────────────────────────────

export const Delivery = Schema.Struct({
  actualDeliveryDate: Schema.optionalKey(ISODate),
  deliveryLocation: Schema.optionalKey(
    Schema.Struct({
      id: Schema.optionalKey(
        Schema.Struct({
          id: Schema.String,
          schemeId: Schema.optionalKey(IcdCode),
        })
      ),
      address: Schema.optionalKey(Address),
    })
  ),
  deliveryParty: Schema.optionalKey(
    Schema.Struct({
      partyName: Schema.Struct({
        name: Schema.String,
      }),
    })
  ),
})
export interface Delivery extends Schema.Schema.Type<typeof Delivery> {}

// ─── Tax Category ───────────────────────────────────────────────────────────

export const TaxCategory = Schema.Struct({
  id: DutyTaxFeeCategoryCode,
  percent: Schema.optionalKey(Schema.Number),
  taxSchemeId: Schema.Struct({
    id: Schema.String.pipe(Schema.withDefault('VAT')),
  }),
})
export interface TaxCategory extends Schema.Schema.Type<typeof TaxCategory> {}

export const TaxSubtotalCategory = Schema.Struct({
  ...TaxCategory.fields,
  taxExemptionReason: Schema.optionalKey(Schema.String),
  taxExemptionReasonCode: Schema.optionalKey(Schema.String),
})
export interface TaxSubtotalCategory extends Schema.Schema.Type<typeof TaxSubtotalCategory> {}

export const TaxSubtotal = Schema.Struct({
  taxAmount: Amount,
  taxCategory: TaxSubtotalCategory,
  taxableAmount: Amount,
})
export interface TaxSubtotal extends Schema.Schema.Type<typeof TaxSubtotal> {}

export const TaxTotal = Schema.Struct({
  taxAmount: Amount,
  taxSubtotals: Schema.optionalKey(Schema.Array(TaxSubtotal)),
})
export interface TaxTotal extends Schema.Schema.Type<typeof TaxTotal> {}

// ─── Legal Monetary Total ───────────────────────────────────────────────────

export const LegalMonetaryTotal = Schema.Struct({
  allowanceTotalAmount: Schema.optionalKey(Amount),
  chargeTotalAmount: Schema.optionalKey(Amount),
  lineExtensionAmount: Amount,
  payableAmount: Amount,
  payableRoundingAmount: Schema.optionalKey(Amount),
  prepaidAmount: Schema.optionalKey(Amount),
  taxExclusiveAmount: Amount,
  taxInclusiveAmount: Amount,
})
export interface LegalMonetaryTotal extends Schema.Schema.Type<typeof LegalMonetaryTotal> {}

// ─── Payment ────────────────────────────────────────────────────────────────

export const PaymentTerms = Schema.Struct({
  note: Schema.String,
})
export interface PaymentTerms extends Schema.Schema.Type<typeof PaymentTerms> {}

export const PaymentMeans = Schema.Struct({
  paymentMeansCode: Schema.Struct({
    code: PaymentMeansCode,
    name: Schema.optionalKey(Schema.String),
  }),
  paymentDueDate: Schema.optionalKey(ISODate),
  paymentId: Schema.optionalKey(Schema.String),
  cardAccount: Schema.optionalKey(
    Schema.Struct({
      holderName: Schema.optionalKey(Schema.String),
      networkId: Schema.String,
      primaryAccountNumberId: Schema.String,
    })
  ),
  payeeFinancialAccount: Schema.optionalKey(
    Schema.Struct({
      financialInstitutionBranch: Schema.optionalKey(
        Schema.Struct({ id: Schema.String })
      ),
      id: Schema.String,
      name: Schema.optionalKey(Schema.String),
    })
  ),
  paymentMandate: Schema.optionalKey(
    Schema.Struct({
      id: Schema.optionalKey(Schema.String),
      payerFinancialAccountId: Schema.optionalKey(
        Schema.Struct({ id: Schema.String })
      ),
    })
  ),
})
export interface PaymentMeans extends Schema.Schema.Type<typeof PaymentMeans> {}

// ─── Allowance / Charge ─────────────────────────────────────────────────────

export const PriceAllowanceCharge = Schema.Struct({
  amount: Amount,
  baseAmount: Schema.optionalKey(Amount),
  chargeIndicator: Schema.Literal(false),
})
export interface PriceAllowanceCharge extends Schema.Schema.Type<typeof PriceAllowanceCharge> {}

const BaseLineAllowanceChargeFields = {
  amount: Amount,
  baseAmount: Schema.optionalKey(Amount),
  allowanceChargeReason: Schema.optionalKey(Schema.String),
  multiplierFactorNumeric: Schema.optionalKey(Schema.Number),
}

export const LineAllowanceCharge = Schema.Union(
  Schema.Struct({
    ...BaseLineAllowanceChargeFields,
    allowanceChargeReasonCode: Schema.optionalKey(AllowanceChargeReasonCode),
    chargeIndicator: Schema.Literal(false),
  }),
  Schema.Struct({
    ...BaseLineAllowanceChargeFields,
    allowanceChargeReasonCode: Schema.optionalKey(ChargeReasonCode),
    chargeIndicator: Schema.Literal(true),
  })
)
export interface LineAllowanceCharge extends Schema.Schema.Type<typeof LineAllowanceCharge> {}

const BaseDocAllowanceChargeFields = {
  ...BaseLineAllowanceChargeFields,
  taxCategory: Schema.optionalKey(
    Schema.Struct({
      ...TaxCategory.fields,
      id: DutyTaxFeeCategoryCode,
      percent: Schema.optionalKey(Schema.Number),
      taxSchemeId: Schema.Struct({
        id: Schema.String.pipe(Schema.withDefault('VAT')),
      }),
    })
  ),
}

export const AllowanceCharge = Schema.Union(
  Schema.Struct({
    ...BaseDocAllowanceChargeFields,
    allowanceChargeReasonCode: Schema.optionalKey(AllowanceChargeReasonCode),
    chargeIndicator: Schema.Literal(false),
  }),
  Schema.Struct({
    ...BaseDocAllowanceChargeFields,
    allowanceChargeReasonCode: Schema.optionalKey(ChargeReasonCode),
    chargeIndicator: Schema.Literal(true),
  })
)
export interface AllowanceCharge extends Schema.Schema.Type<typeof AllowanceCharge> {}

// ─── Binary Object & Additional Document Reference ──────────────────────────

export const BinaryObject = Schema.Struct({
  content: Schema.String,
  mimeCode: MimeCode,
  filename: Schema.String,
})
export interface BinaryObject extends Schema.Schema.Type<typeof BinaryObject> {}

export const AdditionalDocumentReference = Schema.Struct({
  id: Schema.Struct({
    id: Schema.String,
    schemeId: Schema.optionalKey(AdditionalDocumentReferenceCode),
  }),
  documentTypeCode: Schema.optionalKey(Schema.String),
  documentDescription: Schema.optionalKey(Schema.String),
  attachment: Schema.optionalKey(
    Schema.Struct({
      embeddedDocumentBinaryObject: Schema.optionalKey(BinaryObject),
      externalReference: Schema.optionalKey(
        Schema.Struct({ uri: Schema.String })
      ),
    })
  ),
})
export interface AdditionalDocumentReference extends Schema.Schema.Type<typeof AdditionalDocumentReference> {}

// ─── Line Item ──────────────────────────────────────────────────────────────

export const LineItem = Schema.Struct({
  description: Schema.optionalKey(Schema.String),
  name: Schema.String,
  buyersItemIdentification: Schema.optionalKey(
    Schema.Struct({ id: Schema.String })
  ),
  sellersItemIdentification: Schema.optionalKey(
    Schema.Struct({ id: Schema.String })
  ),
  standardItemIdentification: Schema.optionalKey(
    Schema.Struct({
      id: Schema.Struct({
        id: Schema.String,
        schemeId: IcdCode,
      }),
    })
  ),
  originCountryCode: Schema.optionalKey(
    Schema.Struct({ identificationCode: CountryCode })
  ),
  commodityClassifications: Schema.optionalKey(
    Schema.Array(
      Schema.Struct({
        itemClassification: Schema.Struct({
          id: Schema.String,
          listId: ItemClassificationCode,
          listVersionId: Schema.optionalKey(Schema.String),
        }),
      })
    )
  ),
  classifiedTaxCategory: TaxCategory,
  additionalItemProperties: Schema.optionalKey(
    Schema.Array(
      Schema.Struct({
        name: Schema.String,
        value: Schema.String,
      })
    )
  ),
})
export interface LineItem extends Schema.Schema.Type<typeof LineItem> {}

// ─── Line Price ─────────────────────────────────────────────────────────────

export const LinePrice = Schema.Struct({
  allowanceCharge: Schema.optionalKey(PriceAllowanceCharge),
  baseQuantity: Schema.optionalKey(Quantity),
  priceAmount: Amount,
})
export interface LinePrice extends Schema.Schema.Type<typeof LinePrice> {}

// ─── Base Line ──────────────────────────────────────────────────────────────

export const BaseLine = Schema.Struct({
  accountingCost: Schema.optionalKey(Schema.String),
  allowanceCharges: Schema.optionalKey(Schema.Array(LineAllowanceCharge)),
  documentReference: Schema.optionalKey(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
        schemeId: Schema.optionalKey(Schema.String),
        documentTypeCode: Schema.String.pipe(Schema.withDefault('130')),
      })
    )
  ),
  id: Schema.String,
  invoicePeriod: Schema.optionalKey(InvoiceLinePeriod),
  item: LineItem,
  lineExtensionAmount: Amount,
  note: Schema.optionalKey(Schema.String),
  orderLineReference: Schema.optionalKey(
    Schema.Struct({ lineId: Schema.String })
  ),
  price: LinePrice,
})
export interface BaseLine extends Schema.Schema.Type<typeof BaseLine> {}

// ─── Invoice Line & Credit Note Line ────────────────────────────────────────

export const InvoiceLine = Schema.Struct({
  ...BaseLine.fields,
  invoicedQuantity: Schema.Struct({
    ...Quantity.fields,
    unitCode: QuantityUnitCode,
  }),
})
export interface InvoiceLine extends Schema.Schema.Type<typeof InvoiceLine> {}

export const CreditNoteLine = Schema.Struct({
  ...BaseLine.fields,
  creditedQuantity: Schema.Struct({
    ...Quantity.fields,
    unitCode: QuantityUnitCode,
  }),
})
export interface CreditNoteLine extends Schema.Schema.Type<typeof CreditNoteLine> {}

// ─── Billing Base ───────────────────────────────────────────────────────────

const CustomizationId = Schema.String.check(
  Schema.filter((s: string) => s.startsWith('urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0'), {
    message: () =>
      "PEPPOL-EN16931-R004: Specification identifier MUST have the value 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0'.",
  })
)

const PROFILE_ID_RE = /^urn:fdc:peppol.eu:2017:poacc:billing:(\d{2}):1\.0$/

const ProfileId = Schema.String.check(
  Schema.filter((s: string) => PROFILE_ID_RE.test(s), {
    message: () =>
      "PEPPOL-EN16931-R007: Business process MUST be in the format 'urn:fdc:peppol.eu:2017:poacc:billing:NN:1.0' where NN indicates the process number.",
  })
)

export const BillingBase = Schema.Struct({
  customizationId: Schema.optionalKey(CustomizationId.pipe(Schema.withDefault(DEFAULT_CUSTOMIZATION_ID))),
  profileId: Schema.optionalKey(ProfileId.pipe(Schema.withDefault(DEFAULT_PROFILE_ID))),
  id: Schema.String,
  issueDate: ISODate,
  note: Schema.optionalKey(Schema.String),
  taxPointDate: Schema.optionalKey(ISODate),
  documentCurrencyCode: CurrencyCode,
  taxCurrencyCode: Schema.optionalKey(CurrencyCode),
  accountingCost: Schema.optionalKey(Schema.String),
  buyerReference: Schema.optionalKey(Schema.String),
  invoicePeriod: Schema.optionalKey(InvoicePeriod),
  orderReference: Schema.optionalKey(OrderReference),
  billingReferences: Schema.optionalKey(Schema.Array(BillingReference)),
  despatchDocumentReference: Schema.optionalKey(Schema.Struct({ id: Schema.String })),
  receiptDocumentReference: Schema.optionalKey(Schema.Struct({ id: Schema.String })),
  originatorDocumentReference: Schema.optionalKey(Schema.Struct({ id: Schema.String })),
  contractDocumentReference: Schema.optionalKey(Schema.Struct({ id: Schema.String })),
  additionalDocumentReferences: Schema.optionalKey(Schema.Array(AdditionalDocumentReference)),
  accountingSupplierParty: PartyBase,
  accountingCustomerParty: PartyBase,
  payeeParty: Schema.optionalKey(PayeeParty),
  taxRepresentativeParty: Schema.optionalKey(TaxRepresentative),
  delivery: Schema.optionalKey(Delivery),
  paymentMeans: Schema.optionalKey(Schema.Array(PaymentMeans)),
  paymentTerms: Schema.optionalKey(PaymentTerms),
  allowanceCharges: Schema.optionalKey(Schema.Array(AllowanceCharge)),
  taxTotals: Schema.Array(TaxTotal),
  legalMonetaryTotal: LegalMonetaryTotal,
})
export interface BillingBase extends Schema.Schema.Type<typeof BillingBase> {}

// ─── Message Level Response Sub-Schemas ─────────────────────────────────────

export const MessageLevelResponseParty = Schema.Struct({
  endpointId: Schema.optionalKey(Identifier),
})
export interface MessageLevelResponseParty extends Schema.Schema.Type<typeof MessageLevelResponseParty> {}

export const DocumentResponseDocument = Schema.Struct({
  responseCode: ApplicationResponseTypeCode,
  description: Schema.optionalKey(Schema.String),
})
export interface DocumentResponseDocument extends Schema.Schema.Type<typeof DocumentResponseDocument> {}

export const DocumentResponseDocumentReference = Schema.Struct({
  id: Schema.String,
  documentTypeCode: Schema.optionalKey(DocumentTypeCode),
  versionId: Schema.optionalKey(Schema.String),
})
export interface DocumentResponseDocumentReference extends Schema.Schema.Type<typeof DocumentResponseDocumentReference> {}

export const DocumentResponseLineResponseContent = Schema.Struct({
  responseCode: ApplicationResponseTypeCode,
  description: Schema.String,
  status: Schema.Struct({
    statusReasonCode: Schema.Union(
      Schema.Literal('BV'),
      Schema.Literal('BW'),
      Schema.Literal('SV')
    ),
  }),
})
export interface DocumentResponseLineResponseContent extends Schema.Schema.Type<typeof DocumentResponseLineResponseContent> {}

export const DocumentResponseLineResponse = Schema.Struct({
  lineReference: Schema.Struct({
    lineId: Schema.String,
  }),
  response: DocumentResponseLineResponseContent,
})
export interface DocumentResponseLineResponse extends Schema.Schema.Type<typeof DocumentResponseLineResponse> {}

export const MessageLevelResponseDocumentResponse = Schema.Struct({
  response: DocumentResponseDocument,
  documentReference: DocumentResponseDocumentReference,
  lineResponse: Schema.Array(DocumentResponseLineResponse),
})
export interface MessageLevelResponseDocumentResponse extends Schema.Schema.Type<typeof MessageLevelResponseDocumentResponse> {}

// ─── Message Level Response ─────────────────────────────────────────────────

export const MessageLevelResponse = Schema.Struct({
  customizationId: Schema.String,
  profileId: Schema.Literal('urn:fdc:peppol.eu:poacc:bis:mlr:3'),
  id: Schema.String,
  issueDate: ISODate,
  issueTime: Schema.optionalKey(XsdTime),
  senderParty: MessageLevelResponseParty,
  receiverParty: MessageLevelResponseParty,
  documentResponse: MessageLevelResponseDocumentResponse,
})
export interface MessageLevelResponse extends Schema.Schema.Type<typeof MessageLevelResponse> {}

// ─── Invoice Response Sub-Schemas ───────────────────────────────────────────

export const InvoiceResponseStatusReasonCode = Schema.Union(
  Schema.Struct({
    value: OpStatusActionCode,
    listId: Schema.Literal('OPStatusAction'),
  }),
  Schema.Struct({
    value: OpStatusReasonCode,
    listId: Schema.Literal('OPStatusReason'),
  })
)
export interface InvoiceResponseStatusReasonCode extends Schema.Schema.Type<typeof InvoiceResponseStatusReasonCode> {}

export const InvoiceResponseCondition = Schema.Struct({
  attributeId: Schema.String,
  description: Schema.optionalKey(Schema.String),
})
export interface InvoiceResponseCondition extends Schema.Schema.Type<typeof InvoiceResponseCondition> {}

export const InvoiceResponseActualResponseStatus = Schema.Struct({
  statusReasonCode: Schema.optionalKey(InvoiceResponseStatusReasonCode),
  statusReason: Schema.optionalKey(Schema.String),
  condition: Schema.optionalKey(Schema.Array(InvoiceResponseCondition)),
})
export interface InvoiceResponseActualResponseStatus extends Schema.Schema.Type<typeof InvoiceResponseActualResponseStatus> {}

const withStatusCodes = Schema.Union(
  ...invoiceResponseCodeNeedsSchema.map((c) => Schema.Literal(c))
)
const withoutStatusCodes = Schema.Union(
  ...invoiceResponseCodeNotNeedsSchema.map((c) => Schema.Literal(c))
)

export const InvoiceResponseDocumentActualResponse = Schema.Union(
  Schema.Struct({
    responseCode: withStatusCodes,
    effectiveDate: Schema.optionalKey(ISODate),
    status: Schema.Array(InvoiceResponseActualResponseStatus),
  }),
  Schema.Struct({
    responseCode: withoutStatusCodes,
    effectiveDate: Schema.optionalKey(ISODate),
    status: Schema.optionalKey(Schema.Array(InvoiceResponseActualResponseStatus)),
  })
)
export interface InvoiceResponseDocumentActualResponse extends Schema.Schema.Type<typeof InvoiceResponseDocumentActualResponse> {}

export const InvoiceResponseDocumentReference = Schema.Struct({
  id: Schema.String,
  issueDate: Schema.optionalKey(ISODate),
  documentTypeCode: DocumentTypeCode,
})
export interface InvoiceResponseDocumentReference extends Schema.Schema.Type<typeof InvoiceResponseDocumentReference> {}

export const InvoiceResponseDocumentResponseParty = Schema.Struct({
  partyIdentification: Schema.optionalKey(Identifier),
  partyName: Schema.Struct({
    name: Schema.String,
  }),
})
export interface InvoiceResponseDocumentResponseParty extends Schema.Schema.Type<typeof InvoiceResponseDocumentResponseParty> {}

export const InvoiceResponseDocumentResponse = Schema.Struct({
  response: InvoiceResponseDocumentActualResponse,
  documentReference: InvoiceResponseDocumentReference,
  issuerParty: Schema.optionalKey(InvoiceResponseDocumentResponseParty),
  recipientParty: Schema.optionalKey(InvoiceResponseDocumentResponseParty),
})
export interface InvoiceResponseDocumentResponse extends Schema.Schema.Type<typeof InvoiceResponseDocumentResponse> {}

// ─── Invoice ────────────────────────────────────────────────────────────────

export const Invoice = Schema.Struct({
  ...BillingBase.fields,
  dueDate: Schema.optionalKey(ISODate),
  invoiceLines: Schema.Array(InvoiceLine),
  invoiceTypeCode: InvoiceTypeCode,
  projectReference: Schema.optionalKey(Schema.Struct({ id: Schema.String })),
})
export interface Invoice extends Schema.Schema.Type<typeof Invoice> {}

// ─── Credit Note ────────────────────────────────────────────────────────────

export const CreditNote = Schema.Struct({
  ...BillingBase.fields,
  creditNoteLines: Schema.Array(CreditNoteLine),
  creditNoteTypeCode: CreditNoteTypeCode,
})
export interface CreditNote extends Schema.Schema.Type<typeof CreditNote> {}

// ─── Invoice Response ───────────────────────────────────────────────────────

const invoiceResponsePartyFields = {
  ...MessageLevelResponseParty.fields,
  partyIdentification: Schema.optionalKey(Identifier),
  partyLegalEntity: Schema.Struct({
    registrationName: Schema.String,
  }),
}

export const InvoiceResponse = Schema.Struct({
  ...MessageLevelResponse.fields,
  profileId: Schema.Literal('urn:fdc:peppol.eu:poacc:bis:invoice_response:3'),
  senderParty: Schema.Struct({
    ...invoiceResponsePartyFields,
    contact: Schema.optionalKey(Contact),
  }),
  receiverParty: Schema.Struct(invoiceResponsePartyFields),
  note: Schema.optionalKey(Schema.String),
  documentResponse: InvoiceResponseDocumentResponse,
})
export interface InvoiceResponse extends Schema.Schema.Type<typeof InvoiceResponse> {}
