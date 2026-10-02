import { Schema } from 'effect';

import { CBC_NAMESPACE, CAC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A reference to the purchase order or sales order that the invoice relates to.
 *
 * @summary ORDER AND SALES ORDER REFERENCE
 *
 * @name cac:OrderReference
 */
export class PeppolOrderReference extends opaque<PeppolOrderReference>()(
  Schema.Struct({
    /**
     * @description An identifier of a referenced purchase order, issued by the Buyer. An identifier of a referenced purchase order, issued by the Buyer. An
     * invoice must have buyer reference (BT-10) or purchase order reference. In cases where sales order reference is provided, but there's no
     * purchase order reference, then use value "NA" as this element is mandatory in UBL.
     *
     * @example
     *   `98776`;
     *
     * @summary Purchase order reference
     *
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ID',
        description:
          'An identifier of a referenced purchase order, issued by the Buyer. An identifier of a referenced purchase order, issued by the Buyer. An invoice must have buyer reference (BT-10) or purchase order reference. In cases where sales order reference is provided, but there\'s no purchase order reference, then use value "NA" as this element is mandatory in UBL.',
        examples: ['98776'] as unknown as ReadonlyArray<never>,
        title: 'Purchase order reference',
      })
    ),
    /**
     * @description An identifier of a referenced Sales order, issued by the Seller. In cases where sales order reference is provided, but there's no purchase
     * order reference, then set cac:OrderReference/cbc:ID to value "NA" as this element is mandatory in UBL.
     *
     * @example
     *   `112233`;
     *
     * @summary Sales order reference
     *
     * @name `cbc:SalesOrderID`
     */
    salesOrderId: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'SalesOrderID',
        description:
          'An identifier of a referenced Sales order, issued by the Seller. In cases where sales order reference is provided, but there\'s no purchase order reference, then set cac:OrderReference/cbc:ID to value "NA" as this element is mandatory in UBL.',
        examples: ['112233'] as unknown as ReadonlyArray<never>,
        title: 'Sales order reference',
      }),
      Schema.optional
    ),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'OrderReference' }), Schema.toStandardSchemaV1)
) {}
