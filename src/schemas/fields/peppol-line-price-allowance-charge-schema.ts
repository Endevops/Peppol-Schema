import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema';
import { opaque } from '#/schemas/utils/opaque';

class PriceAllowanceCharge extends opaque<PriceAllowanceCharge>()(
  Schema.Struct({
    /**
     * @example
     *   200;
     *
     * @name cbc:Amount (+ @currencyID)
     */
    amount: PeppolAmount,
    /**
     * @example
     *   1000;
     *
     * @name cbc:BaseAmount (+ @currencyID)
     */
    baseAmount: Schema.optional(PeppolAmount),
    /**
     * @name cbc:ChargeIndicator
     *
     * @value false
     */
    chargeIndicator: Schema.Boolean,
  })
) {}

export class PeppolLinePriceAllowanceCharge extends opaque<PeppolLinePriceAllowanceCharge>()(
  PriceAllowanceCharge.pipe(
    Schema.fieldsAssign({
      chargeIndicator: Schema.Literal(false).annotate({
        message: "PEPPOL-EN16931-R044: Charge on price level is NOT allowed. Only value 'false' allowed.",
      }),
    })
  )
) {}

export { PriceAllowanceCharge };
