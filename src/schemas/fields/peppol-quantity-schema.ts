import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolQuantityUnitCode } from '#/schemas/values/quantity-unit-codes-schema.ts';

/**
 * @description A quantity value with an optional unit of measure code.
 *
 * @summary Quantity with optional unit code
 *
 * @name `cbc:* (+ @unitCode)`
 */
export class PeppolQuantity extends opaque<PeppolQuantity>()(
  Schema.Struct({
    /**
     * @name `@unitCode`
     */
    unitCode: Schema.optional(PeppolQuantityUnitCode),
    /**
     * @name `#text (value)`
     */
    value: Schema.Finite,
  })
) {}
