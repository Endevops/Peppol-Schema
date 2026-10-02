import { Schema } from 'effect';

import { CBC_NAMESPACE, CAC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A textual description of the payment terms that apply to the amount due for payment.
 *
 * @summary PAYMENT TERMS
 *
 * @name cac:PaymentTerms
 */
export class PeppolPaymentTerms extends opaque<PeppolPaymentTerms>()(
  Schema.Struct({
    /**
     * @description A textual description of the payment terms that apply to the amount due for payment (Including description of possible penalties). In case the
     * Amount due for payment (BT-115) is positive, either the Payment due date (BT-9) or the Payment terms (BT-20) shall be present.
     *
     * @example
     *   Net within 30 days
     *
     * @summary Payment terms
     *
     * @name cbc:Note
     */
    note: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'Note',
        description:
          'A textual description of the payment terms that apply to the amount due for payment (Including description of possible penalties). In case the Amount due for payment (BT-115) is positive, either the Payment due date (BT-9) or the Payment terms (BT-20) shall be present.',
        title: 'Payment terms',
        examples: ['Net within 30 days'],
      })
    ),
  }).pipe(
    Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'PaymentTerms', title: 'PAYMENT TERMS' }),
    Schema.toStandardSchemaV1
  )
) {}
