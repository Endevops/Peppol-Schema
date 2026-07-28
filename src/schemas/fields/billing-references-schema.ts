import * as z from 'zod/mini';

/**
 * @summary PRECEDING INVOICE REFERENCE (0..n)
 *
 * @name cac:BillingReference
 */
export const billingReferenceSchema = z.object({
  /**
   * @example
   *   inv123;
   *
   * @summary INVOICE DOUCMENT REFERENCE
   *
   * @name `cac:InvoiceDocumentReference`
   */
  invoiceDocumentReference: z.object({
    /**
     * @description The identification of an Invoice that was previously sent by the seller.
     *
     * @example
     *   `inv123`;
     *
     * @summary Preceding invoice number
     *
     * @name `cbc:ID`
     */
    id: z.string(),
    /**
     * @description The date when the preceding invoice was issued. Shall be provided in case the preceding invoice identifier is not unique.
     *
     * @example
     *   `2017-09-15`;
     *
     * @summary Preceding invoice issue date
     *
     * @format `YYYY-MM-DD`
     *
     * @name `cbc:IssueDate`
     */
    issueDate: z.optional(z.iso.date()),
  }),
});
export type PeppolBillingReference = z.infer<typeof billingReferenceSchema>;
