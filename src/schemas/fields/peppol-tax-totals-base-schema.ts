import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema.ts';
import { PeppolTaxSubTotal } from '#/schemas/fields/peppol-tax-subtotal-schema.ts';
import { CBC_NAMESPACE, CAC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description The total tax amount for the document, with an optional breakdown into tax subtotals.
 *
 * @summary TAX TOTAL
 *
 * @name cac:TaxTotal (1..2)
 */
export class PeppolTaxTotal extends opaque<PeppolTaxTotal>()(
  Schema.Struct({
    /**
     * @example
     *   200;
     *
     * @name cbc:TaxAmount (+ @currencyID)
     */
    taxAmount: PeppolAmount.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'TaxAmount', examples: ['200'] as unknown as ReadonlyArray<never> })
    ),
    /**
     * @name cac:TaxSubtotal (0..n)
     */
    taxSubtotals: Schema.optional(Schema.Array(PeppolTaxSubTotal)).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'TaxSubtotal' })
    ),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'TaxTotal' }), Schema.toStandardSchemaV1)
) {}
