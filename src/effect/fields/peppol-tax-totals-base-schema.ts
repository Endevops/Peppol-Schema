import { Schema } from 'effect';

import { PeppolAmount } from '#/effect/fields/peppol-amount-schema';
import { PeppolTaxSubtotal } from '#/effect/fields/peppol-tax-subtotal-schema';
import { opaque } from '#/effect/utils/opaque';

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
    taxSubtotals: Schema.optional(Schema.Array(PeppolTaxSubtotal)),
  })
) {}

export type PeppolTaxTotal = PeppolTaxTotalsBase;
