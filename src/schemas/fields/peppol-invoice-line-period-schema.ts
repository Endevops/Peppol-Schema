import { DateTime, Schema } from 'effect';

import { CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description The period relevant for an Invoice line, given by an optional start date and end date. Wraps the `cac:InvoicePeriod` element as used on a line; the
 * document level period extends this shape in {@link PeppolInvoicePeriod}.
 *
 * @example
 *   ```ts
 *   { startDate: '2017-10-01', endDate: '2017-10-31' }
 *   ```;
 *
 * @see {@link PeppolInvoicePeriod}
 */
export class PeppolInvoiceLinePeriod extends opaque<PeppolInvoiceLinePeriod>()(
  Schema.Struct({
    /**
     * @description The date when the Invoice period for this Invoice line starts.
     *
     * @example
     *   `2017-10-01`;
     *
     * @summary Invoice line period start date
     *
     * @format "YYYY-MM-DD"
     *
     * @name `cbc:StartDate`
     */
    startDate: PeppolIsoDateString.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'StartDate',
        title: 'Invoice line period start date',
        description: 'The date when the Invoice period for this Invoice line starts.',
        examples: [DateTime.makeUnsafe('2017-10-01')],
      }),
      Schema.optional
    ),

    /**
     * @description The date when the Invoice period for this Invoice line ends. Format ="YYYY-MM-DD"
     *
     * @example
     *   `2017-10-31`;
     *
     * @summary Invoice line period end date
     *
     * @format "YYYY-MM-DD"
     *
     * @name `cbc:EndDate`
     */
    endDate: PeppolIsoDateString.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'EndDate',
        title: 'Invoice line period end date',
        description: 'The date when the Invoice period for this Invoice line ends.',
        examples: [DateTime.makeUnsafe('2017-10-31')],
      }),
      Schema.optional
    ),
  }).pipe(
    Schema.annotate({
      xmlNamespace: CBC_NAMESPACE,
      xmlPrefix: 'cbc',
      xmlName: 'InvoicePeriod',
      examples: [{ startDate: DateTime.makeUnsafe('2017-10-01'), endDate: DateTime.makeUnsafe('2017-10-31') }],
      title: 'Invoice line period',
      description: 'The period relevant for an Invoice line, given by an optional start date and end date.',
    }),
    Schema.toStandardSchemaV1
  )
) {}
