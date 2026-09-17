import { Schema } from 'effect';

import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A reference to an Invoice that was previously sent by the Seller, carrying the preceding invoice number and, when the number is not unique, its
 * issue date. Wraps the `cac:InvoiceDocumentReference` element.
 *
 * @example
 *   ```ts
 *   { id: 'inv123', issueDate: '2017-09-15' }
 *   ```;
 *
 * @see {@link PeppolBillingReference}
 */
export class PeppolInvoiceDocumentReference extends opaque<PeppolInvoiceDocumentReference>()(
  Schema.Struct({
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
    issueDate: Schema.optional(PeppolIsoDateString),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description A reference to a preceding Invoice, used when the Invoice corrects or replaces an earlier one. Wraps the `cac:BillingReference` element.
 *
 * @summary PRECEDING INVOICE REFERENCE (0..n)
 *
 * @name cac:BillingReference
 */
export class PeppolBillingReference extends opaque<PeppolBillingReference>()(
  Schema.Struct({
    /**
     * @example
     *   inv123;
     *
     * @summary INVOICE DOCUMENT REFERENCE
     *
     * @name `cac:InvoiceDocumentReference`
     */
    invoiceDocumentReference: PeppolInvoiceDocumentReference,
  }).pipe(Schema.toStandardSchemaV1)
) {}
