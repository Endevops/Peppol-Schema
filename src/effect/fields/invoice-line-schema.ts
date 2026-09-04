import { Schema } from 'effect';

import { quantityUnitCodesSchema } from '#/effect/values/quantity-unit-codes-schema';

import { baseLineSchema } from './base-line-schema';
import { quantitySchema } from './quantity-schema';

/**
 * @summary Invoice line
 *
 * @name cac:InvoiceLine
 */
export const invoiceLineSchema = baseLineSchema.pipe(
  Schema.fieldsAssign({
    /**
     * @description The quantity of items (goods or services) that is charged in the Invoice line.
     *
     * @example
     *   { value: 100, unitCode: "C62" }
     *
     * @summary Invoiced quantity
     *
     * @name cbc:InvoicedQuantity (+ @unitCode)
     */
    invoicedQuantity: quantitySchema.pipe(
      Schema.fieldsAssign({
        /**
         * @description The unit of measure that applies to the invoiced quantity. Codes for unit of packaging from UNECE Recommendation No. 21 can be used in
         * accordance with the descriptions in the "Intro" section of UN/ECE Recommendation 20, Revision 11 (2015): The 2 character alphanumeric code
         * values in UNECE Recommendation 21 shall be used. To avoid duplication with existing code values in UNECE Recommendation No. 20, each code
         * value from UNECE Recommendation 21 shall be prefixed with an “X”, resulting in a 3 alphanumeric code when used as a unit of measure.
         *
         * @example
         *   `C62`;
         *
         * @summary Invoiced quantity unit of measure
         *
         * @see {@link quantityUnitCodes}
         */
        unitCode: quantityUnitCodesSchema(),
      })
    ),
  })
);

export type PeppolInvoiceLine = typeof invoiceLineSchema.Type;
