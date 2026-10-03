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
     * @name `#text (value)`
     */
    value: Schema.Finite.pipe(Schema.annotate({ xmlValue: true, examples: [10] })),

    /**
     * @name `@unitCode`
     */
    unitCode: PeppolQuantityUnitCode.pipe(Schema.annotate({ xmlName: 'unitCode', xmlAttribute: true, examples: ['C62' as never] }), Schema.optional),
  }).pipe(Schema.toStandardSchemaV1)
) {}
