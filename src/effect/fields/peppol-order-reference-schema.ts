import { Schema } from 'effect';

/**
 * @summary ORDER AND SALES ORDER REFERENCE
 *
 * @name cac:OrderReference
 */
export const peppolOrderReferenceSchema = Schema.Struct({
  /**
   * @description An identifier of a referenced purchase order, issued by the Buyer. An identifier of a referenced purchase order, issued by the Buyer. An invoice
   * must have buyer reference (BT-10) or purchase order reference. In cases where sales order reference is provided, but there's no purchase order
   * reference, then use value "NA" as this element is mandatory in UBL.
   *
   * @example
   *   `98776`;
   *
   * @summary Purchase order reference
   *
   * @name `cbc:ID`
   */
  id: Schema.String,
  /**
   * @description An identifier of a referenced Sales order, issued by the Seller. In cases where sales order reference is provided, but there's no purchase order
   * reference, then set cac:OrderReference/cbc:ID to value "NA" as this element is mandatory in UBL.
   *
   * @example
   *   `112233`;
   *
   * @summary Sales order reference
   *
   * @name `cbc:SalesOrderID`
   */
  salesOrderId: Schema.optional(Schema.String),
});

export type PeppolOrderReference = typeof peppolOrderReferenceSchema.Type;
