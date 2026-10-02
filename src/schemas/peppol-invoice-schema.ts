import { Schema } from 'effect';

import { PeppolInvoiceLine } from '#/schemas/fields/peppol-invoice-line-schema.ts';
import { CAC_NAMESPACE, CBC_NAMESPACE, INVOICE_NAMESPACE } from '#/schemas/namespaces.ts';
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
export class PeppolProjectReference extends opaque<PeppolProjectReference>()(
  Schema.Struct({
    /**
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'ProjectReference' }), Schema.toStandardSchemaV1)
) {}

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
export class PeppolInvoice extends Schema.Opaque<PeppolInvoice>()(
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
    dueDate: Schema.optional(PeppolIsoDateString).pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'DueDate', title: 'Payment due date' })
    ),
    /**
     * @summary INVOICE LINE
     *
     * @name cac:InvoiceLine
     */
    invoiceLines: Schema.Array(PeppolInvoiceLine)
      .check(Schema.isMinLength(1))
      .pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'InvoiceLine', title: 'INVOICE LINE' })),
    /**
     * @example
     *   `380`;
     *
     * @summary Invoice type code
     *
     * @name cbc:InvoiceTypeCode
     */
    invoiceTypeCode: PeppolInvoiceTypeCode.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'InvoiceTypeCode',
        title: 'Invoice type code',
        examples: ['380`'] as unknown as ReadonlyArray<never>,
      })
    ),
    /**
     * @summary PROJECT REFERENCE
     *
     * @name cac:ProjectReference
     */
    projectReference: Schema.optional(PeppolProjectReference).pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'ProjectReference', title: 'PROJECT REFERENCE' })
    ),
  }).pipe(Schema.annotate({ xmlNamespace: INVOICE_NAMESPACE, xmlPrefix: 'ubl', xmlName: 'Invoice' }), Schema.toStandardSchemaV1)
) {}

/**
 * @description Type guard that returns `true` when a decoded value is a {@link PeppolInvoice}.
 *
 * @example
 *   ```ts
 *   isPeppolInvoice(doc); // true for a UBL Invoice
 *   ```;
 *
 * @see {@link PeppolDocumentSchema}
 */
export const isPeppolInvoice = Schema.is(PeppolInvoice);
