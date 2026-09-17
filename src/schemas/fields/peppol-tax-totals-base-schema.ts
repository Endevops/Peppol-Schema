import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema.ts';
import { PeppolTaxSubTotal } from '#/schemas/fields/peppol-tax-subtotal-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description The total tax amount for the document, with an optional breakdown into tax subtotals.
 *
 * @summary TAX TOTAL
 *
 * @name cac:TaxTotal (1..2)
 */
export class PeppolTaxTotalsBase extends opaque<PeppolTaxTotalsBase>()(
  Schema.Struct({
    /**
     * @example
     *   200;
     *
     * @name cbc:TaxAmount (+ @currencyID)
     */
    taxAmount: PeppolAmount,
    /**
     * @name cac:TaxSubtotal (0..n)
     */
    taxSubtotals: Schema.optional(Schema.Array(PeppolTaxSubTotal)),
  })
) {}

/**
 * @description Alias for {@link PeppolTaxTotalsBase}.
 */
export type PeppolTaxTotal = PeppolTaxTotalsBase;
