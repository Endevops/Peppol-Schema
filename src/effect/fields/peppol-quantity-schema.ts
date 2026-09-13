import { Schema } from 'effect';

import { quantityUnitCodesSchema } from '#/effect/values/quantity-unit-codes-schema';

/**
 * @summary Quantity with optional unit code
 *
 * @name `cbc:* (+ @unitCode)`
 */
export class PeppolQuantity extends Schema.Opaque<PeppolQuantity>()(
  Schema.Struct({
    /**
     * @name `@unitCode`
     */
    unitCode: Schema.optional(quantityUnitCodesSchema),
    /**
     * @name `#text (value)`
     */
    value: Schema.Finite,
  })
) {}
