import { Effect, Schema } from 'effect';

import { CBC_NAMESPACE, CAC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolDutyTaxFeeCategoryCode } from '#/schemas/values/duty-tax-fee-category-schema.ts';

/**
 * @description The tax scheme identifier for a tax category, defaulting to `VAT` when the element is absent.
 *
 * @example
 *   ```ts
 *   { id: 'VAT' }
 *   ```;
 *
 * @see {@link PeppolTaxCategory}
 */
export class PeppolTaxSchemeId extends opaque<PeppolTaxSchemeId>()(
  Schema.Struct({
    /**
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(
      Schema.withDecodingDefaultType(Effect.succeed('VAT')),
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description A group of business terms providing information about the VAT applicable for the goods and services invoiced on the Invoice line.
 *
 * @summary LINE VAT INFORMATION
 *
 * @name `cac:TaxCategory`
 */
export class PeppolTaxCategory extends opaque<PeppolTaxCategory>()(
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
     * @default VAT
     *
     * @name `cac:TaxScheme`
     */
    taxSchemeId: PeppolTaxSchemeId.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'TaxScheme' })),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'TaxCategory' }), Schema.toStandardSchemaV1)
) {}
