import * as z from 'zod/mini';
import { baseLineSchema } from '#/schemas/fields/base-line-schema';
import { quantitySchema } from '#/schemas/fields/quantity-schema';
import { quantityUnitCodesSchema } from '#/schemas/values/quantity-unit-code-schema';

/**
 * @description Credit note line is identical to Invoice line except the quantity element name.
 */
export const creditNoteLineSchema = z.extend(baseLineSchema, {
  /**
   * @description Invoiced/Credited quantity.
   *
   * @example
   *   { value: 40, unitCode: "C62" }
   *
   * @name cbc:CreditedQuantity (+ @unitCode)
   */
  creditedQuantity: z.safeExtend(quantitySchema, {
    /**
     * @description The unit of measure that applies to the invoiced quantity. Codes for unit of packaging from UNECE Recommendation No. 21 can be used in
     * accordance with the descriptions in the "Intro" section of UN/ECE Recommendation 20, Revision 11 (2015): The 2 character alphanumeric code
     * values in UNECE Recommendation 21 shall be used. To avoid duplication with existing code values in UNECE Recommendation No. 20, each code value
     * from UNECE Recommendation 21 shall be prefixed with an “X”, resulting in a 3 alphanumeric code when used as a unit of measure.
     *
     * @example
     *   `C62`;
     *
     * @summary Invoiced quantity unit of measure
     *
     * @see {@link quantityUnitCodes}
     */
    unitCode: quantityUnitCodesSchema(),
  }),
});

export type PeppolCreditNoteLine = z.infer<typeof creditNoteLineSchema>;
