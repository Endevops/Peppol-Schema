import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema.ts';
import { PeppolTaxSubTotalCategory } from '#/schemas/fields/peppol-tax-subtotal-category-schema.ts';
import { CBC_NAMESPACE, CAC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A VAT breakdown line for a single tax category, giving the taxable amount and the tax amount.
 *
 * @summary VAT breakdown (TaxSubtotal)
 *
 * @name cac:TaxSubtotal
 */
export class PeppolTaxSubTotal extends opaque<PeppolTaxSubTotal>()(
  Schema.Struct({
    /**
     * @description The amount of tax for the tax subtotal.
     *
     * @name `cbc:TaxAmount (+ @currencyID)`
     */
    taxAmount: PeppolAmount.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'TaxAmount' })),
    /**
     * @description The tax category associated with this tax subtotal.
     *
     * @name cac:TaxCategory
     */
    taxCategory: PeppolTaxSubTotalCategory.pipe(
      Schema.annotate({
        xmlNamespace: CAC_NAMESPACE,
        xmlPrefix: 'cac',
        xmlName: 'TaxCategory',
        description: 'The tax category associated with this tax subtotal.',
      })
    ),
    /**
     * @description The taxable amount for the tax subtotal.
     *
     * @name `cbc:TaxableAmount (+ @currencyID)`
     */
    taxableAmount: PeppolAmount.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'TaxableAmount' })),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'TaxSubtotal' }), Schema.toStandardSchemaV1)
) {}
