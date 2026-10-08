import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema.ts';
import { PeppolOrderLineReference } from '#/schemas/fields/peppol-base-line-schema.ts';
import { PeppolInvoiceLinePeriod } from '#/schemas/fields/peppol-invoice-line-period-schema.ts';
import { PeppolLineAllowanceCharge } from '#/schemas/fields/peppol-line-allowance-charge-schema.ts';
import { PeppolLineDocumentReference } from '#/schemas/fields/peppol-line-document-reference-schema.ts';
import { PeppolLineItem } from '#/schemas/fields/peppol-line-item-schema.ts';
import { PeppolLinePrice } from '#/schemas/fields/peppol-line-price-schema.ts';
import { PeppolQuantity } from '#/schemas/fields/peppol-quantity-schema.ts';
import { CAC_NAMESPACE, CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolQuantityUnitCode } from '#/schemas/values/quantity-unit-codes-schema.ts';

/**
 * @description Credit note line is identical to Invoice line except the quantity element name.
 */
export class PeppolCreditNoteLine extends opaque<PeppolCreditNoteLine>()(
  Schema.Struct({
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
    id: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ID',
        description: 'A unique identifier for the individual line within the Invoice.',
        title: 'Invoice line identifier',
        examples: ['12'] as unknown as ReadonlyArray<never>,
      })
    ),

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
    note: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'Note',
        description: 'A textual note that gives unstructured information that is relevant to the Invoice line.',
        title: 'Invoice line note',
        examples: ['New article number 12345'] as unknown as ReadonlyArray<never>,
      }),
      Schema.optional
    ),

    /**
     * @description Invoiced/Credited quantity.
     *
     * @example
     *   { value: 40, unitCode: "C62" }
     *
     * @name cbc:CreditedQuantity (+ @unitCode)
     */
    creditedQuantity: Schema.Struct({
      ...PeppolQuantity.fields,
      /**
       * @description The unit of measure that applies to the invoiced quantity. Codes for unit of packaging from UNECE Recommendation No. 21 can be used in
       * accordance with the descriptions in the "Intro" section of UN/ECE Recommendation 20, Revision 11 (2015): The 2 character alphanumeric code
       * values in UNECE Recommendation 21 shall be used. To avoid duplication with existing code values in UNECE Recommendation No. 20, each code
       * value from UNECE Recommendation 21 shall be prefixed with an “X”, resulting in a 3 alphanumeric code when used as a unit of measure.
       *
       * @example
       *   `C62`;
       *
       * @summary Invoiced quantity unit of measure
       *
       * @see {@link quantityUnitCodes}
       */
      unitCode: PeppolQuantityUnitCode.pipe(
        Schema.annotate({ xmlName: 'unitCode', xmlAttribute: true, description: 'The unit of measure that applies to the invoiced quantity.' })
      ),
    }).pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'CreditedQuantity',
        description: 'Invoiced/Credited quantity.',
        examples: ['{ value: 40, unitCode: "C62" }'] as unknown as ReadonlyArray<never>,
      })
    ),

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
    lineExtensionAmount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'LineExtensionAmount',
        description:
          'The total amount of the Invoice line. The amount is “net” without VAT, i.e. inclusive of line level allowances and charges as well as other relevant taxes. Must be rounded to maximum 2 decimals.',
        title: 'Invoice line net amount',
        examples: [{ value: 2145.0, currencyId: 'EUR' } as PeppolAmount],
      })
    ),

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
    accountingCost: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'AccountingCost',
        description: "A textual value that specifies where to book the relevant data into the Buyer's financial accounts.",
        title: 'Invoice line Buyer accounting reference',
        examples: ['1287:65464`'] as unknown as ReadonlyArray<never>,
      }),
      Schema.optional
    ),

    /**
     * @description A group of business terms providing information about the period relevant for the Invoice line.
     *
     * @summary Invoice line period
     *
     * @name cac:InvoicePeriod
     *
     * @cardinality 0..1
     */
    invoicePeriod: PeppolInvoiceLinePeriod.pipe(
      Schema.annotate({
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'InvoicePeriod',
        description: 'A group of business terms providing information about the period relevant for the Invoice line.',
        title: 'Invoice line period',
      }),
      Schema.optional
    ),

    /**
     * @summary Order line reference
     *
     * @name cac:OrderLineReference
     *
     * @cardinality 0..1
     */
    orderLineReference: PeppolOrderLineReference.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'OrderLineReference', title: 'Order line reference' }),
      Schema.optional
    ),

    /**
     * @summary Line object identifier
     *
     * @name cac:DocumentReference
     *
     * @cardinality 0..1
     */
    documentReference: Schema.Array(PeppolLineDocumentReference).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'DocumentReference', title: 'Line object identifier' }),
      Schema.optional
    ),

    /**
     * @description A group of business terms providing information about allowances or charges applicable to the individual Invoice line.
     *
     * @summary Invoice line allowances or charges
     *
     * @name cac:AllowanceCharge
     *
     * @cardinality 0..n
     */
    allowanceCharges: Schema.Array(PeppolLineAllowanceCharge).pipe(
      Schema.annotate({
        message: 'unable to decode line allowance charge',
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'AllowanceCharge',
        description: 'A group of business terms providing information about allowances or charges applicable to the individual Invoice line.',
        title: 'Invoice line allowances or charges',
      }),
      Schema.optional
    ),

    /**
     * @description A group of business terms providing information about the goods and services invoiced.
     *
     * @summary Item information
     *
     * @name cac:Item
     *
     * @cardinality 1..1
     */
    item: PeppolLineItem.pipe(
      Schema.annotate({
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'Item',
        description: 'A group of business terms providing information about the goods and services invoiced.',
        title: 'Item information',
      })
    ),

    /**
     * @description A group of business terms providing information about the price applied for the goods and services invoices on the Invoice line.
     *
     * @summary Price Details
     *
     * @name cac:Price
     *
     * @cardinality 1..1
     */
    price: PeppolLinePrice.pipe(
      Schema.annotate({
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'Price',
        description:
          'A group of business terms providing information about the price applied for the goods and services invoices on the Invoice line.',
        title: 'Price Details',
      })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}
/**
 * @description Encoded form of {@link PeppolCreditNoteLine} produced by the Effect Schema codec. Fields mirror the decoded structure.
 *
 * @see {@link PeppolCreditNoteLine}
 */
export interface PeppolCreditNoteLineEncoded extends Schema.Codec.Encoded<typeof PeppolCreditNoteLine> {}
