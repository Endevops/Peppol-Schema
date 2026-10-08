import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema.ts';
import { CBC_NAMESPACE, CAC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A group of business terms providing the monetary totals for the Invoice.
 *
 * @summary Document totals
 *
 * @name cac:LegalMonetaryTotal
 */
export class PeppolLegalMonetaryTotal extends opaque<PeppolLegalMonetaryTotal>()(
  Schema.Struct({
    /**
     * @description Sum of all Invoice line net amounts in the Invoice.
     *
     * @remarks
     *   Must be rounded to maximum 2 decimals.
     *
     * @example
     *   3800.0;
     *
     * @summary Sum of Invoice line amount
     *
     * @name `cbc:LineExtensionAmount (+ @currencyID)`
     */
    lineExtensionAmount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'LineExtensionAmount',
        examples: [{ value: 3800, currencyId: 'EUR' } as PeppolAmount],
        description: 'Sum of all Invoice line net amounts in the Invoice.',
        title: 'Sum of Invoice line amount',
      })
    ),

    /**
     * @description The total amount of the Invoice without VAT.
     *
     * @remarks
     *   Must be rounded to maximum 2 decimals.
     *
     * @example
     *   3600.0;
     *
     * @summary Invoice total amount without VAT
     *
     * @name `cbc:TaxExclusiveAmount (+ @currencyID)`
     */
    taxExclusiveAmount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'TaxExclusiveAmount',
        examples: [{ value: 3800, currencyId: 'EUR' } as PeppolAmount],
        title: 'Invoice total amount without VAT',
        description: 'The total amount of the Invoice without VAT.',
      })
    ),

    /**
     * @description The total amount of the Invoice with VAT.
     *
     * @example
     *   4500.0;
     *
     * @summary Invoice total amount with VAT
     *
     * @remark Must be rounded to maximum 2 decimals.
     *
     * @name `cbc:TaxInclusiveAmount (+ @currencyID)`
     */
    taxInclusiveAmount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'TaxInclusiveAmount',
        examples: [{ value: 3800, currencyId: 'EUR' } as PeppolAmount],
        title: 'Invoice total amount with VAT',
        description: 'The total amount of the Invoice with VAT.',
      })
    ),

    /**
     * @description Sum of all allowances on document level in the Invoice.
     *
     * @remarks
     *   Must be rounded to maxium 2 decimals.
     *
     * @example
     *   200.0;
     *
     * @summary Sum of allowances on document level
     *
     * @name `cbc:AllowanceTotalAmount (+ @currencyID)`
     */
    allowanceTotalAmount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'AllowanceTotalAmount',
        examples: [{ value: 3800, currencyId: 'EUR' } as PeppolAmount],
        title: 'Sum of allowances on document level',
        description: 'Sum of all allowances on document level in the Invoice.',
      }),
      Schema.optional
    ),

    /**
     * @description Sum of all charges on document level in the Invoice.
     *
     * @remarks
     *   Must be rounded to maximum 2 decimals.
     *
     * @example
     *   0.0;
     *
     * @summary Sum of charges on document level
     *
     * @name `cbc:ChargeTotalAmount (+ @currencyID)`
     */
    chargeTotalAmount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ChargeTotalAmount',
        examples: [{ value: 3800, currencyId: 'EUR' } as PeppolAmount],
        title: 'Sum of charges on document level',
        description: 'Sum of all charges on document level in the Invoice.',
      }),
      Schema.optional
    ),

    /**
     * @description The sum of amounts which have been paid in advances.
     *
     * @remarks
     *   Must be rounded to maximum 2 decimals.
     *
     * @example
     *   0.0;
     *
     * @summary Paid amount
     *
     * @name `cbc:PrepaidAmount (+ @currencyID)`
     */
    prepaidAmount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'PrepaidAmount',
        examples: [{ value: 3800, currencyId: 'EUR' } as PeppolAmount],
        title: 'Paid amount',
        description: 'The sum of amounts which have been paid in advances.',
      }),
      Schema.optional
    ),

    /**
     * @description The rounding amount applied to the Invoice total.
     *
     * @remarks
     *   Must be rounded to maximum 2 decimals.
     *
     * @example
     *   0.0;
     *
     * @summary Rounding amount
     *
     * @name `cbc:PayableRoundingAmount (+ @currencyID)`
     */
    payableRoundingAmount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'PayableRoundingAmount',
        examples: [{ value: 3800, currencyId: 'EUR' } as PeppolAmount],
        title: 'Rounding amount',
        description: 'The rounding amount applied to the Invoice total.',
      }),
      Schema.optional
    ),

    /**
     * @description The amount due for payment on the Invoice, after accounting for all allowances, charges, prepayments, and rounding adjustments.
     *
     * @remarks
     *   Must be rounded to maximum 2 decimals.
     *
     * @example
     *   4500.0;
     *
     * @summary Amount due for payment
     *
     * @name `cbc:PayableAmount (+ @currencyID)`
     */
    payableAmount: PeppolAmount.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'PayableAmount',
        examples: [{ value: 3800, currencyId: 'EUR' } as PeppolAmount],
        title: 'Amount due for payment',
        description:
          'The amount due for payment on the Invoice, after accounting for all allowances, charges, prepayments, and rounding adjustments.',
      })
    ),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'LegalMonetaryTotal' }), Schema.toStandardSchemaV1)
) {}
