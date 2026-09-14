import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema';
import { PeppolLinePriceAllowanceCharge } from '#/schemas/fields/peppol-line-price-allowance-charge-schema';
import { PeppolQuantity } from '#/schemas/fields/peppol-quantity-schema';
import { opaque } from '#/schemas/utils/opaque';

/**
 * @summary Price details on invoice line
 *
 * @name cac:Price
 */
export class PeppolLinePrice extends opaque<PeppolLinePrice>()(
  Schema.Struct({
    /**
     * @name cac:AllowanceCharge
     *
     * @cardinality 0..1
     */
    allowanceCharge: Schema.optional(PeppolLinePriceAllowanceCharge),
    /**
     * @name cbc:BaseQuantity (+ @unitCode)
     *
     * @cardinality 0..1
     */
    baseQuantity: Schema.optional(PeppolQuantity),
    /**
     * @name cbc:PriceAmount (+ @currencyID)
     */
    priceAmount: PeppolAmount,
  })
) {}
