import { Effect, Schema } from 'effect';

import { amountSchema } from './amount-schema';
import { identifierSchema } from './identifier-schema';
import { invoiceLinePeriodSchema } from './invoice-line-period-schema';
import { lineAllowanceChargeSchema } from './line-allowance-charge-schema';
import { lineItemSchema } from './line-item-schema';
import { linePriceSchema } from './price-schema';

/**
 * @description Base of the invoice line and credit note line schemas.
 */
export const baseLineSchema = Schema.Struct({
  /**
   * @description A textual value that specifies where to book the relevant data into the Buyer's financial accounts.
   *
   * @example
   *   `1287:65464`;
   *
   * @summary Invoice line Buyer accounting reference
   *
   * @name cbc:AccountingCost
   *
   * @cardinality 0..1
   */
  accountingCost: Schema.optional(Schema.String),
  /**
   * @description A group of business terms providing information about allowances or charges applicable to the individual Invoice line.
   *
   * @summary Invoice line allowances or charges
   *
   * @name cac:AllowanceCharge
   *
   * @cardinality 0..n
   */
  allowanceCharges: Schema.optional(Schema.Array(lineAllowanceChargeSchema)),
  /**
   * @summary Line object identifier
   *
   * @name cac:DocumentReference
   *
   * @cardinality 0..1
   */
  documentReference: Schema.optional(
    Schema.Array(
      identifierSchema().pipe(
        Schema.fieldsAssign({
          /**
           * @default 130
           *
           * @name cbc:DocumentTypeCode
           */
          documentTypeCode: Schema.String.pipe(Schema.withDecodingDefaultType(Effect.succeed('130'))),
        })
      )
    )
  ),
  /**
   * @description A unique identifier for the individual line within the Invoice.
   *
   * @example
   *   12;
   *
   * @summary Invoice line identifier
   *
   * @name cbc:ID
   *
   * @cardinality 1..1
   */
  id: Schema.String,
  /**
   * @description A group of business terms providing information about the period relevant for the Invoice line.
   *
   * @summary Invoice line period
   *
   * @name cac:InvoicePeriod
   *
   * @cardinality 0..1
   */
  invoicePeriod: Schema.optional(invoiceLinePeriodSchema),
  /**
   * @description A group of business terms providing information about the goods and services invoiced.
   *
   * @summary Item information
   *
   * @name cac:Item
   *
   * @cardinality 1..1
   */
  item: lineItemSchema,
  /**
   * @description The total amount of the Invoice line. The amount is “net” without VAT, i.e. inclusive of line level allowances and charges as well as other
   * relevant taxes. Must be rounded to maximum 2 decimals.
   *
   * @example
   *   { value: 2145.0, currencyId: "EUR" }
   *
   * @summary Invoice line net amount
   *
   * @name cbc:LineExtensionAmount (+ @currencyID)
   *
   * @cardinality 1..1
   */
  lineExtensionAmount: amountSchema,
  /**
   * @description A textual note that gives unstructured information that is relevant to the Invoice line.
   *
   * @example
   *   New article number 12345
   *
   * @summary Invoice line note
   *
   * @name cbc:Note
   *
   * @cardinality 0..1
   */
  note: Schema.optional(Schema.String),
  /**
   * @summary Order line reference
   *
   * @name cac:OrderLineReference
   *
   * @cardinality 0..1
   */
  orderLineReference: Schema.optional(Schema.Struct({ lineId: Schema.String })),
  /**
   * @description A group of business terms providing information about the price applied for the goods and services invoices on the Invoice line.
   *
   * @summary Price Details
   *
   * @name cac:Price
   *
   * @cardinality 1..1
   */
  price: linePriceSchema,
});

export type PeppolBaseLine = typeof baseLineSchema.Type;
