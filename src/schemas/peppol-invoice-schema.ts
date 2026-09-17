import { Schema } from 'effect';

import { PeppolInvoiceLine } from '#/schemas/fields/peppol-invoice-line-schema.ts';
import { PeppolBillingBase } from '#/schemas/peppol-billing-base-schema.ts';
import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolInvoiceTypeCode } from '#/schemas/values/invoice-type-code-schema.ts';

/**
 * @description Wraps the `cac:ProjectReference` element on an invoice: an identifier of the project the invoice relates to.
 *
 * @example
 *   ```ts
 *   { id: 'project-123' }
 *   ```;
 *
 * @see {@link PeppolInvoice}
 */
export class PeppolProjectReference extends opaque<PeppolProjectReference>()(Schema.Struct({ id: Schema.String }).pipe(Schema.toStandardSchemaV1)) {}

/**
 * @description UBL `Invoice` for PEPPOL BIS Billing 3.0. Extends {@link PeppolBillingBase} with the due date, type code, lines and project reference.
 *
 * @example
 *   ```ts
 *   {
 *     customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
 *     profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
 *     id: '33445566',
 *     issueDate: '2017-11-01',
 *     documentCurrencyCode: 'EUR',
 *     invoiceTypeCode: '380'
 *   }
 *   ```;
 *
 * @see {@link PeppolBillingBase}
 * @see {@link PeppolCreditNote}
 */
export class PeppolInvoice extends opaque<PeppolInvoice>()(
  Schema.Struct({
    ...PeppolBillingBase.fields,
    /**
     * @example
     *   `2017-11-01`;
     *
     * @summary Payment due date
     *
     * @name cbc:DueDate
     */
    dueDate: Schema.optional(PeppolIsoDateString),
    /**
     * @summary INVOICE LINE
     *
     * @name cac:InvoiceLine
     */
    invoiceLines: Schema.Array(PeppolInvoiceLine).check(Schema.isMinLength(1)),
    /**
     * @example
     *   `380`;
     *
     * @summary Invoice type code
     *
     * @name cbc:InvoiceTypeCode
     */
    invoiceTypeCode: PeppolInvoiceTypeCode,
    /**
     * @summary PROJECT REFERENCE
     *
     * @name cac:ProjectReference
     */
    projectReference: Schema.optional(PeppolProjectReference),
  }).pipe(Schema.toStandardSchemaV1)
) {}
