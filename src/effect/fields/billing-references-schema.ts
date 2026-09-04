import { Schema } from 'effect';

import { IsoDateString } from '#/effect/iso-date-string';

/**
 * @summary PRECEDING INVOICE REFERENCE (0..n)
 *
 * @name cac:BillingReference
 */
export const billingReferenceSchema = Schema.Struct({
  /**
   * @example
   *   inv123;
   *
   * @summary INVOICE DOCUMENT REFERENCE
   *
   * @name `cac:InvoiceDocumentReference`
   */
  invoiceDocumentReference: Schema.Struct({
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
    id: Schema.String,
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
    issueDate: Schema.optionalKey(IsoDateString),
  }),
});

export type PeppolBillingReference = typeof billingReferenceSchema.Type;
