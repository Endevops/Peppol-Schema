import { Schema } from 'effect';

import { PeppolAmount } from '#/schemas/fields/peppol-amount-schema.ts';
import { PeppolLinePriceAllowanceCharge } from '#/schemas/fields/peppol-line-price-allowance-charge-schema.ts';
import { PeppolQuantity } from '#/schemas/fields/peppol-quantity-schema.ts';
import { CBC_NAMESPACE, CAC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description The price details of an invoice or credit note line, including the price amount and any price level allowance.
 *
 * @summary Price details on invoice line
 *
 * @name cac:Price
 */
export class PeppolLinePrice extends opaque<PeppolLinePrice>()(
  Schema.Struct({
    /**
     * @name cbc:PriceAmount (+ @currencyID)
     */
    priceAmount: PeppolAmount.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'PriceAmount' })),

    /**
     * @name cbc:BaseQuantity (+ @unitCode)
     *
     * @cardinality 0..1
     */
    baseQuantity: PeppolQuantity.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'BaseQuantity' }), Schema.optional),

    /**
     * @name cac:AllowanceCharge
     *
     * @cardinality 0..1
     */
    allowanceCharge: PeppolLinePriceAllowanceCharge.pipe(
      Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'AllowanceCharge' }),
      Schema.optional
    ),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'Price' }), Schema.toStandardSchemaV1)
) {}
