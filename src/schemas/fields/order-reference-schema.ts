import * as z from 'zod/mini';

/**
 * @summary ORDER AND SALES ORDER REFERENCE
 *
 * @name cac:OrderReference
 */
export const orderReferenceSchema = z.object({
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
  id: z.string(),
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
  salesOrderId: z.optional(z.string()),
});

export type PeppolOrderReference = z.infer<typeof orderReferenceSchema>;
