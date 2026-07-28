import * as z from 'zod/mini';

import { quantityUnitCodesSchema } from '#/schemas/values/quantity-unit-codes-schema';

/**
 * @summary Quantity with optional unit code
 *
 * @name `cbc:* (+ @unitCode)`
 */
export const quantitySchema = z.object({
  /**
   * @name `@unitCode`
   */
  unitCode: z.optional(quantityUnitCodesSchema()),
  /**
   * @name `#text (value)`
   */
  value: z.number(),
});

export type PeppolQuantity = z.infer<typeof quantitySchema>;
