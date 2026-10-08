import { Schema } from 'effect';

import { PeppolTaxSchemeId } from '#/schemas/fields/peppol-tax-category-schema.ts';
import { CAC_NAMESPACE, CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolDutyTaxFeeCategoryCode } from '#/schemas/values/duty-tax-fee-category-schema.ts';

/**
 * @description This one is specific for TaxSubtotal since it includes more fields.
 *
 * @summary Tax Category for Tax Subtotal
 *
 * @name cac:TaxCategory
 */
export class PeppolTaxSubTotalCategory extends opaque<PeppolTaxSubTotalCategory>()(
  Schema.Struct({
    /**
     * @description The VAT category code for the invoiced item.
     *
     * @summary Invoiced item VAT category code
     *
     * @name `cbc:ID`
     */
    id: PeppolDutyTaxFeeCategoryCode.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })),

    /**
     * @description The VAT rate, represented as percentage that applies to the invoiced item.
     *
     * @summary Invoiced item VAT rate
     *
     * @name `cbc:Percent`
     */
    percent: Schema.Finite.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'Percent' }), Schema.optional),

    /**
     * @description The code for the reason of the tax exemption.
     *
     * @name cbc:TaxExemptionReasonCode
     */
    taxExemptionReasonCode: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'TaxExemptionReasonCode',
        description: 'The code for the reason of the tax exemption.',
      }),
      Schema.optional
    ),

    /**
     * @description The reason for the tax exemption.
     *
     * @name cbc:TaxExemptionReason
     */
    taxExemptionReason: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'TaxExemptionReason',
        description: 'The reason for the tax exemption.',
      }),
      Schema.optional
    ),
    /**
     * @default VAT
     *
     * @name `cac:TaxScheme`
     */
    taxSchemeId: PeppolTaxSchemeId.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'TaxScheme' })),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'TaxCategory' }), Schema.toStandardSchemaV1)
) {}

/**
 * @description The encoded form of {@link PeppolTaxSubTotalCategory}, accepted by the decoder before branded code values are applied.
 */
export interface PeppolTaxSubTotalCategoryEncoded extends Schema.Codec.Encoded<typeof PeppolTaxSubTotalCategory> {}
