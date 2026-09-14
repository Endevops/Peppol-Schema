import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema';
import { PeppolTaxSubTotal } from '#/schemas/fields/peppol-tax-subtotal-schema';
import { opaque } from '#/schemas/utils/opaque';

/**
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

export type PeppolTaxTotal = PeppolTaxTotalsBase;
