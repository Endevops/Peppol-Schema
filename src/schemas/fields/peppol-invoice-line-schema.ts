import { Schema } from 'effect';

import { PeppolBaseLine } from '#/schemas/fields/peppol-base-line-schema.ts';
import { PeppolQuantity } from '#/schemas/fields/peppol-quantity-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolQuantityUnitCode } from '#/schemas/values/quantity-unit-codes-schema.ts';

/**
 * @description A line of the Invoice, extending the common line fields with the invoiced quantity. Wraps the `cac:InvoiceLine` element.
 *
 * @summary Invoice line
 *
 * @name cac:InvoiceLine
 */
export class PeppolInvoiceLine extends opaque<PeppolInvoiceLine>()(
  Schema.Struct({
    ...PeppolBaseLine.fields,
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
    invoicedQuantity: PeppolQuantity.pipe(
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
        unitCode: PeppolQuantityUnitCode,
      })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}
/**
 * @description Encoded form of {@link PeppolInvoiceLine} produced by the Effect Schema codec. Fields mirror the decoded structure.
 *
 * @see {@link PeppolInvoiceLine}
 */
export interface PeppolInvoiceLineEncoded extends Schema.Codec.Encoded<typeof PeppolInvoiceLine> {}
